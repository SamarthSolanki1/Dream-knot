import axios from 'axios';
import api from "../api";

const PathwayService = {
  getAllPathways: async () => {
    try {
      const response = await api.get('/api/pathway/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching pathways:', error);
      throw error;
    }
  }
};

export default PathwayService;