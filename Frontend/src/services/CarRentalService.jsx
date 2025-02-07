import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/car-rental/all';

const CarRentalService = {
  getAllCarRentals: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching car rentals:', error);
      throw error;
    }
  },

  addCarRental: async (carRentalData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, carRentalData, {
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