import React, { Component } from 'react';
import imageService from '../../services/image-service';
import ImageForm from '../image-form';
import './style.scss';

class ImageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.removeImage = this.removeImage.bind(this);
    }

    componentDidMount() {
        const imageId = this.props.match.params.id
        imageService.getCurrentImage(imageId)
            .then(res => {
                this.setState(res.data);
            })
    }

    removeImage() {
        const imageId = this.state._id;
        const user = this.state.user;
        imageService.removeImage(imageId, user)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    render() {
        
        return (
            <section className="image-info">
                <div className="image-box">
                    <img src={this.state.imageUrl} alt="" />
                </div>
                <div className="image-stats">
                    <p className="image-title">title: {this.state.title}</p>
                    <p className="image-author">author: {this.state.user}</p>
                    <p className="image-category">category: {this.state.category}</p>
                </div>
                <div>
                    <button onClick={this.removeImage}>Delete</button>
                    <button>Edit</button>
                </div>
                <ImageForm params={this.props.match.params} image={this.state}/>
            </section>
        )
    }
}

export default ImageInfo;