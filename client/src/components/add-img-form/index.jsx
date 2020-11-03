import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import imageService from '../../services/image-service';
import useImput from '../../hooks/userInputChange';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import FittedImage from 'react-fitted-image';
import './style.scss';
import '../register page/style.scss';
import ReactDynamicImport from "react-dynamic-import";
const loader = () => import(`react-fitted-image`);
const FittedImage = ReactDynamicImport({ loader });

const AddImageForm = (props) => {
  const [image, setImage] = useState('');
  const [title, bindTitle, updateTitle] = useImput('');
  const [category, bindCategory, updateCategory] = useImput('');
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(Cookies.get('user'))._id;
  const history = useHistory();

  const onChangeHandler = e => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'gallery');
    formData.append('file', files);
    setLoading(true);

    axios.post('https://api.cloudinary.com/v1_1/donaw6igw/image/upload', formData)
      .then((res) => setImage(res.data.secure_url))
      .then(() => {
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = e => {
    e.preventDefault();

    updateTitle();
    updateCategory();

    imageService.uploadImage({ title, category, imageUrl: image, user: userId, likes: 0, usersWhoLikedThis: [] })
      .then((response) => {
        toast.success(response.data);
        history.push('/user-profile');
      })
      .catch(err => {
        toast.error(err);
      })
  }

  return (
    <section className="img-form">
      <section className="img-container">
        <FittedImage
          fit="contain"
          loader={<div>Loading</div>}
          onLoad={(...args) => console.log(...args)}
          onError={(...args) => console.log(...args)}
          src={image}
        />

        <img src={image} alt="" />
      </section>
      <form className="img-props" onSubmit={handleSubmit}>
        <header>
          <h3>Tell everyone what your image is about</h3>
        </header>
        <p>
          <input type="file" onChange={onChangeHandler} />
        </p>
        <p>
          <input type="text" name="title" placeholder="add your title here" {...bindTitle} />
        </p>
        <p>
          <select name="category" id="ctaegory" className="category" {...bindCategory}>
            <option value="">choose a category</option>
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
        <p><input className="submit-btn" type="submit" value="save" /></p>
      </form>
    </section>
  )
}

export default AddImageForm;