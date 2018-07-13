import axios from 'axios';

const BASE_URL ='https://arik-e-cards.p.mashape.com/';

export interface ecardAPIRequest {
  cardTemplateId: number;
  from: string;
  fromAddress: string;
  message: string;
  subject: string;
  to: string;
  toAddress: string;
}

export default {

  endpoints: {
    sendEcard: async (requestBody: ecardAPIRequest) => {

      const configuration = {
        headers: {
          'X-Mashape-Key': '9P6O8TSzPPmshhPi8cYsebO7xPfap1yMwa6jsn7NLFjsRJWBNR',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };

      return axios.post(`${BASE_URL}`, requestBody, configuration)
        .then(response => response);
    }
  },

};

