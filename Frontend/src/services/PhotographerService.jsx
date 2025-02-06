import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/photographer';

const PhotographerService = {
  getAllPhotographers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching photographers:', error);
      throw error;
    }
  },

  addPhotographer: async (photographerData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, photographerData, {
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