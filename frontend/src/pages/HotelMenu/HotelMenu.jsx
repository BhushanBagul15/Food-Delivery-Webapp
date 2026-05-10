import React, { useContext, useEffect, useState } from 'react';
import './HotelMenu.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';

const HotelMenu = () => {
    const { id } = useParams();
    const { url } = useContext(StoreContext);
    const [hotelData, setHotelData] = useState(null);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const fetchHotelMenu = async () => {
            try {
                const response = await axios.get(`${url}/api/hotel/${id}/menu`);
                if (response.data.success) {
                    setHotelData(response.data.data.hotel);
                    setMenu(response.data.data.menu);
                }
            } catch (error) {
                console.error("Error fetching hotel menu", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotelMenu();
    }, [id, url]);

    if (loading) {
        return <div className="hotel-menu-loading">Loading menu...</div>;
    }

    if (!hotelData) {
        return <div className="hotel-menu-loading">Hotel not found.</div>;
    }

    return (
        <div className='hotel-menu-page'>
            <div className="hotel-header">
                <img src={hotelData.image.startsWith('http') ? hotelData.image : `${url}/images/${hotelData.image}`} alt={hotelData.name} onError={(e) => e.target.src = "https://via.placeholder.com/1200x400?text=Hotel+Cover"} className="hotel-cover-image" />
                <div className="hotel-header-content">
                    <h2>{hotelData.name}</h2>
                    <p>{hotelData.description}</p>
                    <p className="hotel-address">📍 {hotelData.address}</p>
                    <span className="hotel-rating">★ {hotelData.rating}</span>
                </div>
            </div>

            <div className="hotel-menu-container">
                {menu.length > 0 && (
                    <ExploreMenu category={category} setCategory={setCategory} />
                )}

                <div id="hotel-menu-grid">
                    <h3>{category === "All" ? "Full Menu" : category}</h3>
                    {(() => {
                        if (menu.length === 0) {
                            return <p>No items found for this hotel yet.</p>;
                        }
                        
                        const filteredMenu = menu.filter(item => category === "All" || item.category === category);
                        
                        if (filteredMenu.length === 0) {
                            return <p className="no-items-msg">Sorry, no items found in this category. You can explore different foods from the menu above!</p>;
                        }
                        
                        return (
                            <div className="hotel-menu-grid">
                                {filteredMenu.map((item, index) => {
                                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                                })}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
};

export default HotelMenu;
