import axios from 'axios';
import api from "../api";

//const API_URL = 'http://localhost:8080/api/lighting/all';

const LightingService = {
  getAllLightingOptions: async () => {
    try {
      const response = await api.get('/api/lighting/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching lighting options:', error);
      return [];
    }
  }
};

export default LightingService;
