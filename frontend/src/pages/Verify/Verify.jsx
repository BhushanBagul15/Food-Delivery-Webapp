import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext} from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const hotelId = searchParams.get("hotelId");

    const {url} = useContext(StoreContext);  
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            if (hotelId && hotelId !== "undefined") {
                navigate(`/hotel/${hotelId}`);
            } else {
                navigate("/");
            }
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])
    
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify
