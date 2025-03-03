import axios from 'axios';
import api from "../api";

//const BASE_URL = 'http://localhost:8080/api/entrance/all';

const EntranceService = {
  getAllEntrances: async () => {
    try {
      const response = await api.get('/api/entrance/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching entrances:', error);
      throw error;
    }
  }
};

export default EntranceService;
