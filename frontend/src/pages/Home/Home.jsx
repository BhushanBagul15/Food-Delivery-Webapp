
import React, { useState } from 'react';
import './Home.css'
import Header from '../../components/Header/Header'
import HotelDisplay from '../../components/HotelDisplay/HotelDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
const Home = () => {

    const [category,setCategory] = useState("All");

  return (
    <div>
      <Header/> 
      <HotelDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
