import axios from 'axios';
import api from "../api";

 //const API_URL = 'http://localhost:8080/api/dining/all';

const DiningService = {
  getAllDiningOptions: async () => {
    try {
      const response = await api.get('/api/dining/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching dining options:', error);
      return [];
    }
  }
};

export default DiningService;
