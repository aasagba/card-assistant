import axios from 'axios';

const BASE_URL ='';

export interface ecardAPIRequest {

}

export default {

  endpoints: {
    sendEcard: async (requestBody: ecardAPIRequest) => {
      return axios.post(`${BASE_URL}/`, requestBody)
        .then(response => response);
    }
  }
};

