import React, { useState, useEffect } from 'react';
import '../styles/CustomWedding.css'
import MandapService from '../services/MandapService.jsx';
import VenueService from '../services/VenueService';
import EntranceService from '../services/EntranceService';
import DiningService from '../services/DiningService';
import LightingService from '../services/LightingService';
import CarRentalService from '../services/CarRentalService';
import PhotographerService from '../services/PhotographerService';
import PathwayService from '../services/PathwayService';



const CustomWedding = () => {
  const [cart, setCart] = useState([]);
  const [selectedSection, setSelectedSection] = useState('venues');
  const [mandapData, setMandapData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [entranceData, setEntranceData] = useState([]);
  const [diningData, setDiningData] = useState([]);
  const [lightingData, setLightingData] = useState([]);
  const [carRentalData, setCarRentalData] = useState([]);
  const [photographerData, setPhotographerData] = useState([]);
  const [pathwayData, setPathwayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchMandapData(),
      fetchVenueData(),
      fetchEntranceData(),
      fetchDiningData(),
      fetchLightingData(),
      fetchCarRentalData(),
      fetchPhotographerData(),
      fetchPathwayData()
    ]);
  };

  const fetchCarRentalData = async () => {
    setIsLoading(true);
    try {
      const response = await CarRentalService.getAllCarRentals();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `cr${Math.random()}`,
          name: item.carModel || '',
          price: parseFloat(item.price) || 0,
          description: item.description || '',
          carType: item.carType || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setCarRentalData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching car rental data:', error);
      setCarRentalData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPhotographerData = async () => {
    setIsLoading(true);
    try {
      const response = await PhotographerService.getAllPhotographers();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `p${Math.random()}`,
          name: item.name || '',
          price: parseFloat(item.price) || 0,
          experience: item.experience || '',
          specialization: item.specialization || '',
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setPhotographerData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching photographer data:', error);
      setPhotographerData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPathwayData = async () => {
    setIsLoading(true);
    try {
      const response = await PathwayService.getAllPathways();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `pw${Math.random()}`,
          name: item.style || '',
          price: parseFloat(item.price) || 0,
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setPathwayData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching pathway data:', error);
      setPathwayData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiningData = async () => {
    setIsLoading(true);
    try {
      const response = await DiningService.getAllDiningOptions();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `d${Math.random()}`,
          name: item.diningStyle || '',
          price: parseFloat(item.foodServicePrice + item.staffingPrice) || 0,
          capacity: item.capacity || '',
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setDiningData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching dining data:', error);
      setDiningData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLightingData = async () => {
    setIsLoading(true);
    try {
      const response = await LightingService.getAllLightingOptions();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `l${Math.random()}`,
          name: item.lightingType || '',
          price: parseFloat(item.price) || 0,
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setLightingData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching lighting data:', error);
      setLightingData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEntranceData = async () => {
    setIsLoading(true);
    try {
      const response = await EntranceService.getAllEntrances();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `e${Math.random()}`,
          name: item.themeType || '',
          price: parseFloat(item.price) || 0,
          contactPerson: item.contactPerson || '',
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setEntranceData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching entrance data:', error);
      setEntranceData([]);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchVenueData = async () => {
    setIsLoading(true);
    try {
      const response = await VenueService.getAllVenues();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `v${Math.random()}`,
          name: item.name || '',
          price: parseFloat(item.price) || 0,
          capacity: item.capacity || '',
          areaSize: item.areaSize || '',
          contactPerson: item.contactPerson || '',
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setVenueData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching venue data:', error);
      setVenueData([]);
    } finally {
      setIsLoading(false);
    }
  };
  

  const fetchMandapData = async () => {
    setIsLoading(true);
    try {
      const response = await MandapService.getAllMandaps();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `m${Math.random()}`,
          name: item.name || '',
          price: parseFloat(item.price) || 0,
          style: item.decorationType || '',
          capacity: item.capacity || '',
          contactPerson: item.contactPerson || '',
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300'
        }));
        setMandapData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching mandap data:', error);
      setMandapData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const weddingOptions = {
    venues: {
      title: 'Wedding Venues',
      items: venueData.length > 0 ? venueData : []
    },
    mandaps: {
      title: 'Mandap Designs',
      items: mandapData.length > 0 ? mandapData : [] 
    },
    entrance: {
      title: 'Entrance Decorations',
      items: entranceData.length > 0 ? entranceData : []
    },
    dining: { title: 'Dining Setup', items: diningData },
    lighting: { title: 'Lighting Arrangements', items: lightingData },
    cars: {
      title: 'Car Rentals',
      items: carRentalData
    },
    photographers: {
      title: 'Photographers',
      items: photographerData
    },
    pathways: {
      title: 'Pathways',
      items: pathwayData
    }
  };

  const addToCart = (item) => {
    // Determine the section based on the item's properties
    let section = '';
    if (item.areaSize !== undefined) section = 'venues';
    else if (item.decorationType !== undefined) section = 'mandaps';
    else if (item.themeType !== undefined) section = 'entrance';
    else if (item.diningStyle !== undefined) section = 'dining';
    else if (item.lightingType !== undefined) section = 'lighting';
    else if (item.carType !== undefined) section = 'cars';
    else if (item.experience !== undefined) section = 'photographers';
    else if (item.style !== undefined) section = 'pathways';

    // Remove any existing item from the same section
    const updatedCart = cart.filter(cartItem => {
      if (cartItem.areaSize !== undefined) return section !== 'venues';
      if (cartItem.decorationType !== undefined) return section !== 'mandaps';
      if (cartItem.themeType !== undefined) return section !== 'entrance';
      if (cartItem.diningStyle !== undefined) return section !== 'dining';
      if (cartItem.lightingType !== undefined) return section !== 'lighting';
      if (cartItem.carType !== undefined) return section !== 'cars';
      if (cartItem.experience !== undefined) return section !== 'photographers';
      if (cartItem.style !== undefined) return section !== 'pathways';
      return true;
    });

    // Add the new item
    setCart([...updatedCart, item]);
  };


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="custom-wedding-container1">
      <div className="main-content1">
        <h1 className="page-title1">Custom Wedding Designer</h1>
        <div className="cart-total1">
          <span className="cart-icon1">🛒</span>
          Total: ₹{calculateTotal().toLocaleString()}
        </div>

        <div className="section-buttons1" style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {Object.keys(weddingOptions).slice(0, 4).map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`section-button1 ${selectedSection === section ? 'active' : ''}`}
              >
                {weddingOptions[section].title}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {Object.keys(weddingOptions).slice(4, 8).map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`section-button1 ${selectedSection === section ? 'active' : ''}`}
              >
                {weddingOptions[section].title}
              </button>
            ))}
          </div>
        </div>

        <div className="items-grid1">
          {weddingOptions[selectedSection].items.map((item) => (
            <div key={item.id} className="item-card1">
              <img src={item.image} alt={item.name} className="item-image1" />
              <div className="item-details1">
                <h3 className="item-name1">{item.name}</h3>
                <p className="item-price1">₹{item.price.toLocaleString()}</p>
                {item.location && <p className="item-info1">Location: {item.location}</p>}
                {item.capacity && <p className="item-info1">Capacity: {item.capacity}</p>}
                {item.style && <p className="item-info1">Style: {item.style}</p>}
                {item.experience && <p className="item-info1">Experience: {item.experience} years</p>}
                {item.specialization && <p className="item-info1">Specialization: {item.specialization}</p>}
                {item.carType && <p className="item-info1">Car Type: {item.carType}</p>}
                <button onClick={() => addToCart(item)} className="add-to-cart-button1">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomWedding;