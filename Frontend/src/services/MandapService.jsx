import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/mandap/all';

const MandapService = {
  getAllMandaps: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching mandaps:', error);
      throw error;
    }
  }
};

export default MandapService;