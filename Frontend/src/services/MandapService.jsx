import axios from 'axios';
import api from "../api";


const MandapService = {
  getAllMandaps: async () => {
    try {
      const response = await api.get('/api/mandap/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching mandaps:', error);
      throw error;
    }
  }
};

export default MandapService;