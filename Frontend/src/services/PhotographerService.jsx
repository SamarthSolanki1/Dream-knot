import api from "../api";

const BASE_URL = 'http://localhost:8080/api/photographer';

const PhotographerService = {
  getAllPhotographers: async () => {
    try {
      const response = await api.get('/api/photographer/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching photographers:', error);
      throw error;
    }
  },

  addPhotographer: async (photographerData) => {
    try {
      const response = await api.post('/api/photographer/add', photographerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding photographer:', error);
      throw error;
    }
  }
};

export default PhotographerService;