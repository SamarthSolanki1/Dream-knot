import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/pathway/all';

const PathwayService = {
  getAllPathways: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching pathways:', error);
      throw error;
    }
  }
};

export default PathwayService;