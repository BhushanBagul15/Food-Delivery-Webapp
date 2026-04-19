import React, { useContext, useEffect, useState } from 'react';
import './HotelDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelDisplay = ({ category }) => {
    const { url } = useContext(StoreContext);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async (lat, lng) => {
            try {
                let endpoint = `${url}/api/hotel/nearby`;
                if (lat && lng) {
                    endpoint += `?lat=${lat}&lng=${lng}`;
                }
                const response = await axios.get(endpoint);
                if (response.data.success) {
                    setHotels(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching hotels", error);
            } finally {
                setLoading(false);
            }
        };

        // Try to get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchHotels(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.log("Location access denied or failed, fetching all hotels");
                    fetchHotels(); // Fetch all if denied
                }
            );
        } else {
            fetchHotels();
        }
    }, [url]);

    if (loading) {
        return <div className="hotel-loading">Finding nearby restaurants...</div>;
    }

    return (
        <div className='hotel-display' id='hotel-display'>
            <h2>Top Restaurants Near You</h2>
            <div className="hotel-display-list">
                {hotels
                    .filter((hotel) => category === "All" || hotel.menuType === category)
                    .map((hotel) => (
                    <div 
                        key={hotel._id} 
                        className="hotel-card"
                        onClick={() => navigate(`/hotel/${hotel._id}`)}
                    >
                        {/* We use a placeholder if the image isn't configured for static serving */}
                        <img className='hotel-item-image' src={hotel.image.startsWith('http') ? hotel.image : `${url}/images/${hotel.image}`} alt={hotel.name} onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Hotel"} />
                        <div className="hotel-item-info">
                            <div className="hotel-item-name-rating">
                                <h3>{hotel.name}</h3>
                                <div className="hotel-rating">★ {hotel.rating}</div>
                            </div>
                            <p className="hotel-item-desc">{hotel.description}</p>
                            <p className="hotel-item-address">{hotel.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotelDisplay;
