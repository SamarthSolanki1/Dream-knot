import api from "../api";// Import your configured axios instance

const CarRentalService = {
  getAllCarRentals: async () => {
    try {
      const response = await api.get('/api/car-rental/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching car rentals:', error);
      throw error;
    }
  },

  addCarRental: async (carRentalData) => {
    try {
      const response = await api.post('/api/car-rental/add', carRentalData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding car rental:', error);
      throw error;
    }
  }
};

export default CarRentalService;
