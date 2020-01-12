import React, { useState } from 'react';
import './style.scss';

const RegisterPage = () => {

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gallery');
    setLoading(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/donaw6igw/image/upload',
      {
        method: 'POST',
        body: data
      }
    )

    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  }

  return (
    <div className="register-form-wrapper">
      <form className="register-form">
        <header>
          <h3>Fill the form to signup</h3>
        </header>
        <p>
          <input className="form-input" type="text" name="username" placeholder="username" />
        </p>
        <p>
          <input className="form-input" type="password" name="password" placeholder="password" />
        </p>
        <p>
          <input className="form-input" type="password" name="repeat-pass" placeholder="confirm password" />
        </p>
        <h4>choose your avatar</h4>
        <p>
          <input className="upload-file" type="file" name="file" placeholder="choose avatar" onChange={uploadImage} />
        </p>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
            <img src={image} alt="" />
          )}
        <p>
          <input className="signup-btn" type="submit" value="Signup" />
        </p>
      </form>
    </div>
  )
}

export default RegisterPage;
