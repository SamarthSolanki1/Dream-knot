import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dining/all';

const DiningService = {
  getAllDiningOptions: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching dining options:', error);
      return [];
    }
  }
};

export default DiningService;
