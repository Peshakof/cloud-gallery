import React from 'react';
import './style.scss';

const AddImageForm = () => {



  return (
    <section className="img-form">
      <section className="img-container">
        <h4>upload image</h4>
      </section>
      <form className="img-props">
        <header>
          <h3>Tell everyone what your image is about</h3>
        </header>
        <p>
          <input type="text" name="title" placeholder="add your title here" />
        </p>
        <p>
          <select name="category" id="ctaegory" className="category">
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
        <p>
          <select name="aspect-ratio" id="aspect-ratio">
            <option value="">choose the aspect ratio e.g 16x9</option>
            <option value="portrait">portrait</option>
            <option value="landscape">landscape</option>
            <option value="square">square</option>
          </select>
        </p>
        <p><input className="upload-btn" type="submit" value="save"/></p>
      </form>
    </section>
  )
}

export default AddImageForm;