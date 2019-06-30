import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import axios from 'axios';

export class BookItem extends Component {
  state = {
    imageUrl: '',
    author: '',
    isLoaded: false
  }
  static propTypes = {
    book: propTypes.object.isRequired
  }

  componentDidMount() {
    const { featured_media, author } = this.props.book;

    const getImageUrl = axios.get(`/PageWordpressAndReact/wp-json/wp/v2/media/${featured_media}`);

    const getAuthor = axios.get(`/PageWordpressAndReact/wp-json/wp/v2/users/${author}`);

    Promise.all([getImageUrl, getAuthor]).then(res => {
      console.log(res);
      this.setState({
        imageUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true
      });
    });
  }

  render() {
    const { id, title, excerpt } = this.props.book;
    const { author, imageUrl, isLoaded } = this.state;

    if(isLoaded) {
      return (
        <div style={{ maxWidth: '250px', minHeight: '396px' }}>
          <h2 style={{ marginBottom: '0' }}>{title.rendered}</h2>
          <small>
            Review by <strong>{ author }</strong>
          </small>
          <img style={{ width: '100%' }} src={ imageUrl } alt={title.rendered}/>
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered}} />

          <Link to={`/book/${id}`}>Read Review</Link>
          <hr />
        </div>
      )
    }

    return null;
  }
}

export default BookItem
