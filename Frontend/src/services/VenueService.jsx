import axios from 'axios';
import api from '../api';

const BASE_URL = 'http://localhost:8080/api/venue/all';

const VenueService = {
  getAllVenues: async () => {
    try {
      const response = await api.get('api/venue/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching venues:', error);
      throw error;
    }
  }
};

export default VenueService;