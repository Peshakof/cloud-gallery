import React, { Component } from 'react';
import imageService from '../../services/image-service';
import commentsService from '../../services/commens-service';
import ImageForm from '../image-form';
import Comment from './comment';
import './style.scss';

class ImageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: { display: 'none' },
            currentComment: '',
            commentsArr: []
        }
        this.inputRef = React.createRef();
        this.editFormRef = React.createRef();
        this.commentsRef = React.createRef();
        this.removeImage = this.removeImage.bind(this);
        this.editImage = this.editImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const imageId = this.props.match.params.id
        imageService.getCurrentImage(imageId)
            .then(res => {
                this.setState(res.data);
            })
        commentsService.getAllComments(imageId)
            .then(res => {
                this.setState({ commentsArr: res.data })
            })
    }

    removeImage() {
        const imageId = this.state._id;
        const user = this.state.user;
        imageService.removeImage(imageId, user)
            .then(res => {
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

    handleChange(event) {
        this.setState({
            currentComment: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const id = this.state._id;
        const commentValue = this.state.currentComment;
        await commentsService.postComment({ image: id, value: commentValue })
        await commentsService.getAllComments(this.state._id)
            .then(res => {
                this.setState({
                    commentsArr: res.data
                })
                this.inputRef.current.value = '';
                this.inputRef.current.focus();
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
                    <button onClick={this.editImage} ref={this.ref}>Edit</button>
                </div>
                <div ref={this.editFormRef} style={this.state.style}>
                    <ImageForm history={this.props.history} params={this.props.match.params} />
                </div>
                <div ref={this.commentsRef}>
                    <header>
                        <h4>Comments</h4>
                    </header>
                    <form onSubmit={this.handleSubmit}>
                        {
                            this.state.commentsArr.length ?
                                this.state.commentsArr.map(comment => {
                                    return <Comment key={comment._id} comment={comment} />
                                }) : <p>Add comment</p>
                        }
                        <p>
                            <input ref={this.inputRef} type="text" name="comment" onChange={this.handleChange} value={this.state.currentComment} />
                        </p>
                        <p>
                            <input type="submit" value="Submit" />
                        </p>
                    </form>
                </div>
            </section>
        )
    }
}

export default ImageInfo;