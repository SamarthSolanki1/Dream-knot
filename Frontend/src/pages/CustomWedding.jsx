import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import '../styles/CustomWedding.css';
import MandapService from '../services/MandapService.jsx';
import VenueService from '../services/VenueService';
import EntranceService from '../services/EntranceService';
import DiningService from '../services/DiningService';
import LightingService from '../services/LightingService';
import CarRentalService from '../services/CarRentalService';
import PhotographerService from '../services/PhotographerService';
import PathwayService from '../services/PathwayService';
import SlidingCart from './SlidingCart';

const CustomWedding = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const [fallbackImages] = useState({
    venues: '/images/default-venue.jpg',
    mandaps: '/images/default-mandap.jpg',
    entrance: '/images/default-entrance.jpg',
    dining: '/images/default-dining.jpg',
    lighting: '/images/default-lighting.jpg',
    cars: '/images/default-car.jpg',
    photographers: '/images/default-photographer.jpg',
    pathways: '/images/default-pathway.jpg'
  });

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

  const getPlaceholderImage = () => '/api/placeholder/400/300';

  const generateUniqueKey = (item, index, section) => {
    if (item.id) return `item-${item.id}`;
    return `${section}-item-${index}`;
  };

  const handleImageError = (e, type) => {
    e.target.onerror = null;
    e.target.src = fallbackImages[type] || getPlaceholderImage();
  };

  const getDisplayName = (item) => {
    return item.name || item.modelName || item.themeType || item.lightingType || item.diningStyle || item.themeType1;
  };

  const formatValue = (key, value) => {
    if (value === undefined || value === null || value === '') return '';
    
    switch(key) {
      case 'price':
      case 'pricePerDay':
      case 'foodServicePrice':
      case 'staffingPrice':
        return `₹${parseFloat(value).toLocaleString()}`;
      case 'capacity':
        return `${value} people`;
      case 'experience':
        return `${value} years`;
      case 'numberOfUnits':
        return `${value} units`;
      default:
        return value.toString();
    }
  };

  const DetailModal = ({ item, onClose }) => {
    if (!item) return null;

    const renderDetailRow = (label, value, index) => {
      if (value === undefined || value === null || value === '') return null;
      return (
        <div key={`${label}-${index}`} className="modal-detail-row">
          <strong className="modal-detail-label">{label}:</strong>
          <span className="modal-detail-value">{value}</span>
        </div>
      );
    };

    const renderDetails = () => {
      const allDetails = [
        { label: "Name", value: formatValue("name", item.name) },
        { label: "Model Name", value: formatValue("modelName", item.modelName) },
        { label: "Theme Type", value: formatValue("themeType", item.themeType) },
        { label: "Lighting Type", value: formatValue("lightingType", item.lightingType) },
        { label: "Dining Style", value: formatValue("diningStyle", item.diningStyle) },
        { label: "Price", value: formatValue("price", item.price) },
        { label: "Price Per Day", value: formatValue("pricePerDay", item.pricePerDay) },
        { label: "Capacity", value: formatValue("capacity", item.capacity) },
        { label: "Description", value: formatValue("description", item.description) },
        { label: "Registration Number", value: formatValue("registrationNumber", item.registrationNumber) },
        { label: "Menu Options", value: formatValue("menuOptions", item.menuOptions) },
        { label: "Staffing Options", value: formatValue("staffingOptions", item.staffingOptions) },
        { label: "Food Service Price", value: formatValue("foodServicePrice", item.foodServicePrice) },
        { label: "Staffing Price", value: formatValue("staffingPrice", item.staffingPrice) },
        { label: "Number of Units", value: formatValue("numberOfUnits", item.numberOfUnits) },
        { label: "Power Requirement", value: formatValue("powerRequirement", item.powerRequirement) },
        { label: "Duration", value: formatValue("duration", item.duration) },
        { label: "Installation Time", value: formatValue("installationTime", item.installationTime) },
        { label: "Specialization", value: formatValue("specialization", item.specialization) },
        { label: "Experience", value: formatValue("experience", item.experience) },
        { label: "Equipment", value: formatValue("equipment", item.equipment) },
        { label: "Contact Person", value: formatValue("contactPerson", item.contactPerson) },
        { label: "Contact Number", value: formatValue("contactNumber", item.contactNumber || item.contactPhone) },
        { label: "Contact Email", value: formatValue("contactEmail", item.contactEmail || item.email) }
      ];

      return allDetails.map((detail, index) => {
        if (detail.value) {
          return renderDetailRow(detail.label, detail.value, index);
        }
        return null;
      });
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{getDisplayName(item)}</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="modal-image-container">
              <img 
                src={item.image || getPlaceholderImage()}
                alt={getDisplayName(item)} 
                className="modal-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getPlaceholderImage();
                }}
              />
            </div>
            <div className="modal-details-scroll">
              {renderDetails()}
            </div>
          </div>
          <div className="modal-footer">
            <button className="close-modal-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  // Data fetching functions
  const fetchMandapData = async () => {
    setIsLoading(true);
    try {
      const response = await MandapService.getAllMandaps();
      if (response) {
        const formattedData = response.map(item => ({
          id: item.id,
          name: item.name || '',
          price: parseFloat(item.price) || 0,
          capacity: item.capacity || 0,
          decorationType: item.decorationType || '',
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

  


const fetchVenueData = async () => {
  setIsLoading(true);
  try {
    const response = await VenueService.getAllVenues();
    if (response) {
      const formattedData = response.map(item => ({
        id: item.id,
        name: item.name || '',
        price: parseFloat(item.price) || 0,
        capacity: item.capacity || 0,
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

const fetchEntranceData = async () => {
  setIsLoading(true);
  try {
    const response = await EntranceService.getAllEntrances();
    if (response) {
      const formattedData = response.map(item => ({
        id: item.id,
        themeType: item.themeType || '',
        price: parseFloat(item.price) || 0,
        contactPerson: item.contactPerson || '',
        contactPhone: item.contactPhone || '',
        contactEmail: item.contactEmail || '',
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

const fetchDiningData = async () => {
  setIsLoading(true);
  try {
    const response = await DiningService.getAllDiningOptions();
    if (response) {
      const formattedData = response.map(item => ({
        id: item.id,
        diningStyle: item.diningStyle || '',
        capacity: item.capacity || 0,
        menuOptions: item.menuOptions || '',
        staffingOptions: item.staffingOptions || '',
        foodServicePrice: parseFloat(item.foodServicePrice) || 0,
        staffingPrice: parseFloat(item.staffingPrice) || 0,
        price: (parseFloat(item.foodServicePrice) || 0) + (parseFloat(item.staffingPrice) || 0),
        contactPerson: item.contactPerson || '',
        contactPhone: item.contactPhone || '',
        contactEmail: item.contactEmail || '',
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
        id: item.id,
        lightingType: item.lightingType || '',
        price: parseFloat(item.price) || 0,
        numberOfUnits: item.numberOfUnits || 0,
        powerRequirement: item.powerRequirement || '',
        duration: item.duration || '',
        installationTime: item.installationTime || '',
        contactPerson: item.contactPerson || '',
        contactPhone: item.contactPhone || '',
        contactEmail: item.contactEmail || '',
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

const fetchCarRentalData = async () => {
  setIsLoading(true);
  try {
    const response = await CarRentalService.getAllCarRentals();
    if (response) {
      const formattedData = response.map(item => ({
        id: item.id,
        modelName: item.modelName || '',
        price: parseFloat(item.pricePerDay) || 0,
        capacity: item.capacity || 0,
        registrationNumber: item.registrationNumber || '',
        contactPerson: item.contactPerson || '',
        contactNumber: item.contactNumber || '',
        description: item.description || '',
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
        id: item.id,
        name: item.name || '',
        price: parseFloat(item.pricePerDay) || 0,
        specialization: item.specialization || '',
        experience: item.experience || 0,
        equipment: item.equipment || '',
        contactNumber: item.contactNumber || '',
        email: item.email || '',
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
        id: item.id,
        themeType1: item.themeType || '',
        price: parseFloat(item.price) || 0,
        contactPerson: item.contactPerson || '',
        contactPhone: item.contactPhone || '',
        contactEmail: item.contactEmail || '',
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



  const weddingOptions = {
    venues: {
      title: 'Wedding Venues',
      items: venueData
    },
    mandaps: {
      title: 'Mandap Designs',
      items: mandapData
    },
    entrance: {
      title: 'Entrance Decorations',
      items: entranceData
    },
    dining: {
      title: 'Dining Setup',
      items: diningData
    },
    lighting: {
      title: 'Lighting Arrangements',
      items: lightingData
    },
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
    let section = '';
    
    // More precise section determination
    if (item.areaSize !== undefined) section = 'venues';
    else if (item.decorationType !== undefined) section = 'mandaps';
    else if (item.themeType !== undefined) {
      section = item.contactEmail ? 'entrance' : 'pathways';
    }
    else if (item.diningStyle !== undefined) section = 'dining';
    else if (item.lightingType !== undefined) section = 'lighting';
    else if (item.modelName !== undefined) section = 'cars';
    else if (item.pricePerDay !== undefined && item.registrationNumber !== undefined) section = 'cars';
    else if (item.experience !== undefined) section = 'photographers';
    else if (item.contactPhone !== undefined && !item.diningStyle) section = 'pathways';
  
    // Check if an item from this section is already in the cart
    const existingItemInSection = cart.find(cartItem => {
      let cartItemSection = '';
      if (cartItem.areaSize !== undefined) cartItemSection = 'venues';
      else if (cartItem.decorationType !== undefined) cartItemSection = 'mandaps';
      else if (cartItem.themeType !== undefined) {
        cartItemSection = cartItem.contactEmail ? 'entrance' : 'pathways';
      }
      else if (cartItem.diningStyle !== undefined) cartItemSection = 'dining';
      else if (cartItem.lightingType !== undefined) cartItemSection = 'lighting';
      else if (cartItem.modelName !== undefined) cartItemSection = 'cars';
      else if (cartItem.pricePerDay !== undefined && cartItem.registrationNumber !== undefined) cartItemSection = 'cars';
      else if (cartItem.experience !== undefined) cartItemSection = 'photographers';
      else if (cartItem.contactPhone !== undefined && !cartItem.diningStyle) cartItemSection = 'pathways';
  
      return cartItemSection === section;
    });
  
    // If an item from this section is already in the cart, don't add
    if (existingItemInSection) {
      // Optional: Add an alert or toast to inform the user
      return;
    }
  
    // Add section information to the item
    const itemWithSection = { ...item, section };
  
    // Add the item to the cart
    setCart([...cart, itemWithSection]);
    setIsCartOpen(true);
  };
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || item.pricePerDay || 0), 0);
  };

  return (
    <div className="custom-wedding-container1">
      <div className="main-content1">
        <h1 className="page-title1">Custom Wedding Designer</h1>
        <div 
          className="cart-total1" 
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={24} />
          <span>Cart: ₹{calculateTotal().toLocaleString()}</span>
        </div>

        <div className="section-buttons1" style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '1rem' }}>
          {[0, 1].map(row => (
            <div key={`row-${row}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {Object.entries(weddingOptions).slice(row * 4, (row + 1) * 4).map(([section, { title }]) => (
                <button
                  key={`section-${section}`}
                  onClick={() => setSelectedSection(section)}
                  className={`section-button1 ${selectedSection === section ? 'active' : ''}`}
                >
                  {title}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="items-grid1">
          {weddingOptions[selectedSection].items.map((item, index) => (
            <div 
              key={generateUniqueKey(item, index, selectedSection)} 
              className="item-card1"
            >
              <img
                src={item.image || getPlaceholderImage()}
                alt={getDisplayName(item)}
                className="item-image1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getPlaceholderImage();
                }}
              />
              <div className="item-details1">
                <h3 className="item-name1">{getDisplayName(item)}</h3>
                <p className="item-price1">₹{(item.price || item.pricePerDay || 0).toLocaleString()}</p>
                <div className="card-buttons">
                  <button 
                    onClick={() => addToCart(item)} 
                    className="add-to-cart-button1"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }} 
                    className="view-details-button"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isCartOpen && (
          <SlidingCart 
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onRemoveItem={removeFromCart}
            calculateTotal={calculateTotal}
          />
        )}


        {isModalOpen && <DetailModal item={selectedItem} onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default CustomWedding;




