import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  // Handle text input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) formData.append("image", image);

    try {
      // Send data to backend
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        // alert("Product added successfully!");

        // Reset form
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
         
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Error uploading product. Check console for details.");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              alt="upload" 
            />
          </label>
          <input
            type="file"
            id='image'
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name='name'
            placeholder='Type here'
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name='description'
            rows='6'
            placeholder='Write content here'
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name='price'
              placeholder='$20'
              value={data.price}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
};

export default Add;
