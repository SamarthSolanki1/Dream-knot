import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/venue/all';

const VenueService = {
  getAllVenues: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching venues:', error);
      throw error;
    }
  }
};

export default VenueService;