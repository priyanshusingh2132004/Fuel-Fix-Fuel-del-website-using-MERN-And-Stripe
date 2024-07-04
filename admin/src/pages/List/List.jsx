import React, { useEffect, useState } from 'react';
import './List.css';
import { url, currency } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/fuel/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching fuel data");
      }
    } catch (error) {
      console.error('Error fetching fuel list:', error);
      toast.error('Failed to fetch fuel list. Please try again later.');
    }
  };

  const removeFuel = async (fuelId) => {
    try {
      const response = await axios.post(`${url}/api/fuel/remove`, {
        id: fuelId
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing fuel");
      }
    } catch (error) {
      console.error('Error removing fuel:', error);
      toast.error('Failed to remove fuel. Please try again later.');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Fuels List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='cursor' onClick={() => removeFuel(item._id)}>x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
