import React, { useState, useEffect } from 'react';
import '../styles/CustomWedding.css';
import MandapService from '../services/MandapService.jsx';
import VenueService from '../services/VenueService';
import EntranceService from '../services/EntranceService';
import DiningService from '../services/DiningService';
import LightingService from '../services/LightingService';

const CustomWedding = () => {
  const [cart, setCart] = useState([]);
  const [selectedSection, setSelectedSection] = useState('venues');
  const [mandapData, setMandapData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [entranceData, setEntranceData] = useState([]);
  const [diningData, setDiningData] = useState([]);
  const [lightingData, setLightingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewCart, setViewCart] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchMandapData();
    fetchVenueData();
    fetchEntranceData();
    fetchDiningData();
    fetchLightingData();
  }, []);

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
          image: item.image || 'https://via.placeholder.com/400x300',
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
          image: item.image || 'https://via.placeholder.com/400x300',
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
          image: item.image || 'https://via.placeholder.com/400x300',
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
      console.log(response.data);
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id || `v${Math.random()}`,
          name: item.name || '',
          price: parseFloat(item.price) || 0,
          capacity: item.capacity || '',
          areaSize: item.areaSize || '',
          contactPerson: item.contactPerson || '',
          description: item.description || '',
          image: item.image || 'https://via.placeholder.com/400x300',
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
          image: item.image || 'https://via.placeholder.com/400x300',
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
      items: venueData.length > 0 ? venueData : [],
    },
    mandaps: {
      title: 'Mandap Designs',
      items: mandapData.length > 0 ? mandapData : [],
    },
    entrance: {
      title: 'Entrance Decorations',
      items: entranceData.length > 0 ? entranceData : [],
    },
    dining: { title: 'Dining Setup', items: diningData },
    lighting: { title: 'Lighting Arrangements', items: lightingData },
  };

  const addToCart = (item) => {
    const sectionItems = cart.filter(cartItem => cartItem.section === selectedSection);

    if (sectionItems.length > 0) {
      alert(`You can only select one item from ${weddingOptions[selectedSection].title}.`);
      return;
    }

    setCart([...cart, { ...item, section: selectedSection }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleViewDetail = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div className="custom-wedding-container1">
      {viewCart ? (
        <div className="cart-view1">
          <h2>Your Cart</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ₹{item.price.toLocaleString()}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ₹{calculateTotal().toLocaleString()}</p>
          <button className="cartback-button" onClick={() => setViewCart(false)}>Back to Selection</button>
        </div>
      ) : (
        <div className="main-content1">
          <h1 className="page-title1">Custom Wedding Designer</h1>
          <div className="cart-total1">
            <span className="cart-icon1">🛒</span>
            Total: ₹{calculateTotal().toLocaleString()}
            <button className="cartbutton" onClick={() => setViewCart(true)}>View Cart</button>
          </div>

          <div className="section-buttons1">
            {Object.keys(weddingOptions).map(section => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`section-button1 ${selectedSection === section ? 'active' : ''}`}
              >
                {weddingOptions[section].title}
              </button>
            ))}
          </div>

          <div className="items-grid1">
            {weddingOptions[selectedSection].items.map(item => (
              <div key={item.id} className="item-card1">
                <img src={item.image} alt={item.name} className="item-image1" />
                <div className="item-details1">
                  <h3 className="item-name1">{item.name}</h3>
                  <p className="item-price1">₹{item.price.toLocaleString()}</p>
                  {item.capacity && <p className="item-info1">Capacity: {item.capacity}</p>}
                  {item.style && <p className="item-info1">Style: {item.style}</p>}
                  <button onClick={() => handleViewDetail(item)} className="view-detail-button1">
                    View Detail
                  </button>
                  <button onClick={() => addToCart(item)} className="add-to-cart-button1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="detail-modal1">
          <div className="detail-content1">
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.image} alt={selectedItem.name} className="detail-image1" />
            <p><strong>Price:</strong> ₹{selectedItem.price.toLocaleString()}</p>
            {selectedItem.capacity && <p><strong>Capacity:</strong> {selectedItem.capacity}</p>}
            {selectedItem.areaSize && <p><strong>Area Size:</strong> {selectedItem.areaSize}</p>}
            {selectedItem.contactPerson && <p><strong>Contact Person:</strong> {selectedItem.contactPerson}</p>}
            {selectedItem.description && <p><strong>Description:</strong> {selectedItem.description}</p>}
            <button onClick={handleCloseDetail} className="close-detail-button1">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomWedding;