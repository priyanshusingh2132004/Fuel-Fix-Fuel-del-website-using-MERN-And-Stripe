import React, { useContext } from 'react'
import './FuelDisplay.css' 
import FuelItem from '../FuelItem/FuelItem' 
import { StoreContext } from '../../Context/StoreContext'

const FuelDisplay = ({ category }) => {

  const { fuel_list } = useContext(StoreContext); 

  return (
    <div className='fuel-display' id='fuel-display'> 
      <h2>Options</h2>
      <div className='fuel-display-list'> 
        {fuel_list.map((item) => {
          if (category === "All" || category === item.category) {
            return <FuelItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/> // Update component name
          }
          return null; 
        })}
      </div>
    </div>
  )
}

export default FuelDisplay
