import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorders = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        
        
    }

    useEffect(()=>{
        if(token) {
            fetchOrders();
            
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) => (
                                <span key={index}>
                                {item.name} x {item.quantity}
                                {index < order.items.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span className='color'>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default Myorders
