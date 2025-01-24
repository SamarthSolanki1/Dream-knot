import axios from 'axios';

const API_URL = 'http://localhost:8080/api/lighting/all';

const LightingService = {
  getAllLightingOptions: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching lighting options:', error);
      return [];
    }
  }
};

export default LightingService;
