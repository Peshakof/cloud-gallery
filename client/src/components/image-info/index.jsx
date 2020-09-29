import React, { Component } from 'react';
import imageService from '../../services/image-service';
import ImageForm from '../image-form';
import './style.scss';

class ImageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: { display: 'none' }
        }
        this.ref = React.createRef();
        this.editFormRef = React.createRef();
        this.removeImage = this.removeImage.bind(this);
        this.editImage = this.editImage.bind(this);
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

    editImage() {
        if (this.editFormRef.current.style.display == 'none') {
            this.editFormRef.current.style.display = 'block'
        } else {
            this.editFormRef.current.style.display = 'none'
        }
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
                    <button onClick={this.editImage} ref={this.ref}>Edit</button>
                </div>
                <div ref={this.editFormRef} style={this.state.style}>
                    <ImageForm history={this.props.history} params={this.props.match.params} />
                </div>
            </section>
        )
    }
}

export default ImageInfo;