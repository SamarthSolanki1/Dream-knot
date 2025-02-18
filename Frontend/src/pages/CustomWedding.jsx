import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import '../styles/CustomWedding.css';
import api from '../api';
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
  const [showDateModal, setShowDateModal] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedItems, setBookedItems] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [filteredMandapData, setFilteredMandapData] = useState([]);
  const [filteredVenueData, setFilteredVenueData] = useState([]);
  const [filteredEntranceData, setFilteredEntranceData] = useState([]);
  const [filteredDiningData, setFilteredDiningData] = useState([]);
  const [filteredLightingData, setFilteredLightingData] = useState([]);
  const [filteredCarRentalData, setFilteredCarRentalData] = useState([]);
  const [filteredPhotographerData, setFilteredPhotographerData] = useState([]);
  const [filteredPathwayData, setFilteredPathwayData] = useState([]);
  const [modalDate, setModalDate] = useState('');
  
  
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
  const checkDateAvailability = async (date) => {
    try {
      const response = await api.get(`/api/custom-bookings/check-bookings?eventDate=${date}`);
      return response.data;
    } catch (error) {
      console.error('Error checking date availability:', error);
      return [];
    }
  };
  const handleDateSelection = async (date) => {
    setSelectedDate(date);
    const bookedItemsResponse = await checkDateAvailability(date);
    
    if (!bookedItemsResponse || bookedItemsResponse.length === 0) {
      // If no bookings found, show all items
      setFilteredMandapData(mandapData);
      setFilteredVenueData(venueData);
      setFilteredEntranceData(entranceData);
      setFilteredDiningData(diningData);
      setFilteredLightingData(lightingData);
      setFilteredCarRentalData(carRentalData);
      setFilteredPhotographerData(photographerData);
      setFilteredPathwayData(pathwayData);
    } else {
      // Filter out booked items
      setBookedItems(bookedItemsResponse);
      filterAvailableItems(bookedItemsResponse);
    }
    
    setShowDateModal(false);
    setIsDateSelected(true);
  };
  const filterAvailableItems = (bookedItems) => {
    // Create a map of booked items by type for faster lookup
    const bookedMap = {
      mandap: new Set(),
      customVenue: new Set(),
      entrance: new Set(),
      dining: new Set(),
      lighting: new Set(),
      carRental: new Set(),
      photographer: new Set(),
      pathway: new Set()
    };

    // Populate the sets with booked item IDs
    bookedItems.forEach(booking => {
      if (booking.mandap) bookedMap.mandap.add(booking.mandap.id);
      if (booking.customVenue) bookedMap.customVenue.add(booking.customVenue.id);
      if (booking.entrance) bookedMap.entrance.add(booking.entrance.id);
      if (booking.dining) bookedMap.dining.add(booking.dining.id);
      if (booking.lighting) bookedMap.lighting.add(booking.lighting.id);
      if (booking.carRental) bookedMap.carRental.add(booking.carRental.id);
      if (booking.photographer) bookedMap.photographer.add(booking.photographer.id);
      if (booking.pathway) bookedMap.pathway.add(booking.pathway.id);
    });

    // Filter each category
    setFilteredMandapData(mandapData.filter(item => !bookedMap.mandap.has(item.id)));
    setFilteredVenueData(venueData.filter(item => !bookedMap.customVenue.has(item.id)));
    setFilteredEntranceData(entranceData.filter(item => !bookedMap.entrance.has(item.id)));
    setFilteredDiningData(diningData.filter(item => !bookedMap.dining.has(item.id)));
    setFilteredLightingData(lightingData.filter(item => !bookedMap.lighting.has(item.id)));
    setFilteredCarRentalData(carRentalData.filter(item => !bookedMap.carRental.has(item.id)));
    setFilteredPhotographerData(photographerData.filter(item => !bookedMap.photographer.has(item.id)));
    setFilteredPathwayData(pathwayData.filter(item => !bookedMap.pathway.has(item.id)));
  };

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
    console.log(response);
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
      console.log(formattedData);
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
    items: isDateSelected ? filteredVenueData : []
  },
  mandaps: {
    title: 'Mandap Designs',
    items: isDateSelected ? filteredMandapData : []
  },
  entrance: {
    title: 'Entrance Decorations',
    items: isDateSelected ? filteredEntranceData : []
  },
  dining: {
    title: 'Dining Setup',
    items: isDateSelected ? filteredDiningData : []
  },
  lighting: {
    title: 'Lighting Arrangements',
    items: isDateSelected ? filteredLightingData : []
  },
  cars: {
    title: 'Car Rentals',
    items: isDateSelected ? filteredCarRentalData : []
  },
  photographers: {
    title: 'Photographers',
    items: isDateSelected ? filteredPhotographerData : []
  },
  pathways: {
    title: 'Pathways',
    items: isDateSelected ? filteredPathwayData : []
  }
};
const DateSelectionModal = ({ onClose, onDateSelect }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalDate) {
      onDateSelect(modalDate);
    }
  };

  return (
    <div className="date-modal-overlay">
      <div className="date-modal">
        <h2>Select Wedding Date</h2>
        <form onSubmit={handleSubmit}>
          <div className="date-input-container">
            <input
              type="date"
              value={modalDate}
              onChange={(e) => setModalDate(e.target.value)}
              min={today}
              required
              className="date-input"
            />
          </div>
          <div className="date-modal-buttons">
            <button type="submit" className="date-submit-button">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

  const addToCart = (item) => {
    // Add the entire selected item to the cart
    const itemid = item.id;
    console.log(itemid);
    setCart([...cart, item]); 
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
        {showDateModal && (
        <DateSelectionModal
          onClose={() => setShowDateModal(false)}
          onDateSelect={handleDateSelection}
        />
      )}
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
            selectedDate={modalDate}
            onClose={() => setIsCartOpen(false)}
            onRemoveItem={removeFromCart}
            calculateTotal={calculateTotal}
          />
        )}
      </div>
    </div>
  );
};
export default CustomWedding;