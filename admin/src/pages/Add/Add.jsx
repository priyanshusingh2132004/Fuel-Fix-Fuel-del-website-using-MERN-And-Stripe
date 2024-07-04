import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/fuel/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: data.category
                });
                setImage(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding fuel:', error);
            toast.error('Failed to add fuel. Please try again later.');
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input
                        onChange={(e) => { setImage(e.target.files[0]); e.target.value = ''; }}
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                    />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Type here'
                        required
                    />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea
                        name='description'
                        onChange={onChangeHandler}
                        value={data.description}
                        type="text"
                        rows={6}
                        placeholder='Write content here'
                        required
                    />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="CNG">CNG</option>
                            <option value="Electic Battery">Electic Battery</option>
                            <option value="Coal">Coal</option>
                            <option value="Ethanol">Ethanol</option>
                            <option value="Machanic">Machanic</option>
                            <option value="Tow Truck">Tow Truck</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input
                            type="Number"
                            name='price'
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder='25'
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;
