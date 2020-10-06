import React, { Component } from 'react';
import imageService from '../../services/image-service';
import commentsService from '../../services/commens-service';
import userService from '../../services/user-service';
import ImageForm from '../image-form';
import Comment from './comment';
import Cookies from 'js-cookie';
import axios from 'axios';
import './style.scss';

class ImageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            style: { display: 'none' },
            currentComment: '',
            commentsArr: [],
            uploader: {},
            isliked: false
        }
        this.inputRef = React.createRef();
        this.editFormRef = React.createRef();
        this.commentsRef = React.createRef();
        this.likeBtn = React.createRef();
        this.removeImage = this.removeImage.bind(this);
        this.editImage = this.editImage.bind(this);
        this.like = this.like.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const imageId = this.props.match.params.id
        const image = imageService.getCurrentImage(imageId);
        const comments = commentsService.getAllComments(imageId);
        axios.all([image, comments]).then(
            axios.spread((...results) => {
                this.setState({ image: results[0].data })
                this.setState({ commentsArr: results[1].data })
                const id = this.state.image.user
                userService.getUserInfo(id)
                    .then(user => {
                        this.setState({ uploader: user.data });
                    })
            })
        )
    }

    removeImage() {
        const imageId = this.state.image._id;
        const user = this.state.image.user;
        imageService.removeImage(imageId, user)
            .then(res => {
            })
            .catch(err => {
                console.error(err);
            })
    }

    editImage() {
        if (this.editFormRef.current.style.display === 'none') {
            this.editFormRef.current.style.display = 'block'
        } else {
            this.editFormRef.current.style.display = 'none'
        }
    }

    like() {
        let likes = ++this.state.image.likes;
        const image = this.state.image;
        this.setState({
            isliked: true,
            image: {
                _id: image._id,
                likes: likes,
                imageUrl: image.imageUrl,
                title: image.title,
                category: image.category,
                user: image.user,
                comments: image.comments
            }
        })
        const imageId = this.state.image._id;
        const updatedImage = this.state.image;

        imageService.editImage(imageId, updatedImage)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleChange(event) {
        this.setState({
            currentComment: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const id = this.state.image._id;
        const commentValue = this.state.currentComment;
        const user = JSON.parse(Cookies.get('user'));
        await commentsService.postComment({ image: id, value: commentValue, author: user._id })
        await commentsService.getAllComments(this.state.image._id)
            .then(res => {
                this.setState({
                    commentsArr: res.data
                })
                this.inputRef.current.value = '';
                this.inputRef.current.focus();
            })
    }

    render() {
        const image = this.state.image;
        const currentUser = JSON.parse(Cookies.get('user'));
        const imageAuthor = this.state.uploader._id;
        const isMine = currentUser._id === imageAuthor;
        const uploader = this.state.uploader.username;
        const likes = this.state.image.likes;

        if (this.state.isliked) {
            this.likeBtn.current.style.pointerEvents = 'none';
        }
        return (
            <section className="image-info">
                <div className="image-box">
                    <img src={image.imageUrl} alt="image" />
                </div>
                <div className="image-stats">
                    <p className="image-title">title: {image.title}</p>
                    <p className="image-uploader">uploader: {uploader}</p>
                    <p className="image-category">category: {image.category}</p>
                    <p className="image-likes">likes: {likes}</p>
                </div>
                <div>
                    {
                        isMine ? <div>
                            <button onClick={this.removeImage}>Delete</button>
                            <button onClick={this.editImage} ref={this.ref}>Edit</button>
                            <button onClick={this.like} ref={this.likeBtn}>Like</button>
                        </div> :
                            <button onClick={this.like} ref={this.likeBtn}>Like</button>
                    }
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