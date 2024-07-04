import React, { useContext } from 'react'
import './FuelDisplay.css' // Update CSS file import
import FuelItem from '../FuelItem/FuelItem' // Update component import
import { StoreContext } from '../../Context/StoreContext'

const FuelDisplay = ({ category }) => {

  const { fuel_list } = useContext(StoreContext); // Update context variable

  return (
    <div className='fuel-display' id='fuel-display'> {/* Update className */}
      <h2>Options</h2>
      <div className='fuel-display-list'> {/* Update className */}
        {fuel_list.map((item) => { // Update map function
          if (category === "All" || category === item.category) {
            return <FuelItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/> // Update component name
          }
          return null; // Ensure to return null or handle other cases
        })}
      </div>
    </div>
  )
}

export default FuelDisplay
