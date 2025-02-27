import React, { useContext, useState } from 'react';
import './FuelItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FuelItem = ({ image, name, price, desc, id }) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    return (
        <div className='fuel-item'> 
            <div className='fuel-item-img-container'> 
                <img className='fuel-item-image' src={url + "/images/" + image} alt="" /> 
                                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className="fuel-item-counter"> 
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="fuel-item-info"> 
                <div className="fuel-item-name-rating"> 
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="fuel-item-desc">{desc}</p> 
                <p className="fuel-item-price">{currency}{price}</p> 
            </div>
        </div>
    );
};

export default FuelItem;
