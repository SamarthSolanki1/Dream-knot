import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/entrance/all';

const EntranceService = {
  getAllEntrances: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching entrances:', error);
      throw error;
    }
  }
};

export default EntranceService;
