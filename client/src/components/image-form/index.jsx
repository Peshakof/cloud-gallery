import React, { Component } from 'react';
import imageService from '../../services/image-service';
import { toast } from 'react-toastify';

class ImageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    const id = this.props.params.id
    imageService.getCurrentImage(id)
      .then(res => {
        this.setState(res.data)
      })
  }

  handleSubmit(event) {
    event.preventDefault();

    const id = this.state._id;
    const title = this.state.title;
    const category = this.state.category;

    imageService.editImage(id, { title, category })
      .then(response => {
        toast.success(response.data);
        this.props.history.push(`/user-profile`);
      })
      .catch(err => {
        toast.error(err);
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="edit-image-form">
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder={this.state.title} onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="category">Category</label>
          <select name="category" id="ctaegory" value={this.state.category} className="category" onChange={this.handleChange}>
            <option value="pet">pet</option>
            <option value="places">places</option>
            <option value="cars">cars</option>
            <option value="landscapes">landscapes</option>
            <option value="houses">houses</option>
            <option value="sport">sport</option>
            <option value="people">people</option>
            <option value="nature">nature</option>
            <option value="high-tech">high-tech</option>
          </select>
        </p>
        <p><input className="submit-btn" type="submit" value="submit" /></p>
      </form>
    )
  }
}

export default ImageForm;