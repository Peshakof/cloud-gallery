import React, { Component } from 'react';
import imageService from '../../services/image-service';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { options } from '../../../../api/image';


class ImageForm extends Component {
  constructor(props) {
    super(props)

    this.options = [
      'pet', 'places', 'cars', 'landscape', 'sport', 'houses', 'people'
    ]

    this.pet = React.createRef();
    this.places = React.createRef();
    this.cars= React.createRef();
    this.landscape = React.createRef();
    this.people = React.createRef();
    this.houses = React.createRef();
    this.sport = React.createRef();
    this.nature = React.createRef();
    this.highTech = React.createRef();
    
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // componentDidMount() {
  //   const c = this.props.image.category;
  //   console.log(c)
  // }

  handleSubmit(event) {
    event.preventDefault();

    const id = this.props.image._id;
    const title = this.state.title;
    const category = this.state.category;
    const history = useHistory();

    imageService.editImage(id, { title, category })
      .then(response => {
        toast.success(response.data);
        history.push(`/image-info/${id}`);
      })
      .catch(err => {
        toast.error(err);
      })

  }

  render() {
   
    const image = this.props.image;
    const category = image.category;
    switch (category) {
      case 'places':
        this.places.current.style.color = 'blue'
        break;
    
      default:
        break;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder={image.title} onChange={this.handleChange} />
        </p>
        <p>
          <label htmlFor="category">Category</label>
          <select name="category" id="ctaegory" className="category" onChange={this.handleChange}>
            {/* <option ref={this.categoryRef} value={image.category}>{image.category}</option> */}
            <option value="pet" ref={this.pet}>pet</option>
            <option value="places" ref={this.places}>places</option>
            <option value="cars" ref={this.cars}>cars</option>
            <option value="landscapes" ref={this.landscape}>landscapes</option>
            <option value="houses" ref={this.houses}>houses</option>
            <option value="sport" ref={this.sport}>sport</option>
            <option value="people" ref={this.people}>people</option>
            <option value="nature" ref={this.nature}>nature</option>
            <option  value="high-tech" ref={this.highTech}>high-tech</option>
            {/* {
              this.options.map(option => {
                return <option key={option} value={option} >{option}</option>
              })
            } */}
          </select>
        </p>
        <p><input className="submit-btn" type="submit" value="submit" /></p>
      </form>
    )
  }
}

export default ImageForm;