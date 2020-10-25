import React, { Component } from 'react';
import imageService from '../../services/image-service';
import commentsService from '../../services/commens-service';
import userService from '../../services/user-service';
import ImageForm from '../image-form';
import Comment from './comment';
import Cookies from 'js-cookie';
import axios from 'axios';
import FittedImage from 'react-fitted-image';
import anime from 'animejs/lib/anime.es.js';
import {Link} from 'react-scroll';
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
            currentUser: '',
            isLoading: false
            //todo 
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
                this.setState({ 
                    image: results[0].data,
                    commentsArr: results[1].data,
                    isLoading: true 
                })
                const id = this.state.image.user

                userService.getUserInfo(id)
                    .then(user => {
                        this.setState({
                            uploader: user.data,
                            currentUser: JSON.parse(Cookies.get('user'))
                        })
                        const image = this.state.image;
                        const currentUser = this.state.currentUser._id;
                        const liked = image.usersWhoLikedThis.includes(currentUser);
                        if (liked) {
                            // this.likeBtn.current.style.pointerEvents = 'none';
                            this.likeBtn.current.textContent = 'Liked';
                            this.likeBtn.current.style.background = 'rgb(59, 58, 58)';
                        }
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
            anime.timeline({
                easing: 'linear',
                duration: '300'
              })
              .add({
                targets: '.edit-form-container',
                opacity: [0,1],
                delay:100
              })
        } else {
            anime.timeline({
                easing: 'linear',
                duration: '200'
            })
            .add({
                targets: '.edit-form-container',
                opacity: [1,0],
                delay:100
            })
            this.editFormRef.current.style.display = 'none'
        }
    }

    like() {
        let likes = this.state.image.likes + 1;
        const image = this.state.image;
        const currentUser = JSON.parse(Cookies.get('user'))
        if (!image.usersWhoLikedThis.includes(currentUser._id)) {
            let usersWhoLikedImage = image.usersWhoLikedThis.push(currentUser._id);
            this.likeBtn.current.style.pointerEvents = 'none';
            this.likeBtn.current.textContent = 'Liked';
            this.likeBtn.current.style.background = 'rgb(59, 58, 58)';
            this.setState({
                isliked: true,
                image: {
                    _id: image._id,
                    likes: likes,
                    imageUrl: image.imageUrl,
                    title: image.title,
                    category: image.category,
                    user: image.user,
                    comments: image.comments,
                    usersWhoLikedThis: usersWhoLikedImage
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
        const currentUser = this.state.currentUser;
        const imageAuthor = this.state.uploader._id;
        const isMine = currentUser._id === imageAuthor;
        const uploader = this.state.uploader.username;
        const likes = this.state.image.likes;

        console.log(this.state.isLoading)
        return (
            <section className="image-info">
                <div className="image-box">
                    {
                        this.state.isLoading ? (<FittedImage
                        fit="contain"
                        loader={<div>Loading</div>}
                        onLoad={(...args) => console.log(...args)}
                        onError={(...args) => console.log(...args)}
                        src={image.imageUrl}
                    />) : (<FittedImage
                        fit="contain"
                        loader={<div>Loading</div>}
                        onLoad={(...args) => console.log(...args)}
                        onError={(...args) => console.log(...args)}
                        src="https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif"
                    />)
                    }
                    
                </div>
                <div className="image-stats">
                    <p className="image-title">title: {image.title}</p>
                    <p className="image-uploader">uploader: {uploader}</p>
                    <p className="image-category">category: {image.category}</p>
                    <p className="image-likes">likes: {likes}</p>
                    {
                        isMine ? <div className="buttons">
                            <button onClick={this.removeImage}>Delete</button>
                            <Link onClick={this.editImage} ref={this.ref} to="edit-form" smooth={true} duration={500} className="edit-btn">Edit</Link>
                            <button onClick={this.like} ref={this.likeBtn}>Like</button>
                        </div> :
                            <div className="buttons">
                                <button onClick={this.like} ref={this.likeBtn}>Like</button>
                            </div>
                    }
                </div>

                <div ref={this.editFormRef} style={this.state.style} className="edit-form-container" id="edit-form">
                    <ImageForm history={this.props.history} params={this.props.match.params} />
                </div>
                <div ref={this.commentsRef} className="comments">

                    <form onSubmit={this.handleSubmit} className="comment-form">
                        <header>
                            <h4>Comments</h4>
                        </header>
                        {
                            this.state.commentsArr.map(comment => {
                                return <Comment key={comment._id} comment={comment} />
                            })
                        }
                        <p className="comment-input">
                            <input ref={this.inputRef} type="text" name="comment" onChange={this.handleChange} value={this.state.currentComment} />
                        </p>
                        <p>
                            <input type="submit" value="Add Comment" className="button" />
                        </p>
                    </form>
                </div>
            </section>
        )
    }
}

export default ImageInfo;