import axios from 'axios';

// const BASE_URL ='https://arik-e-cards.p.mashape.com/';
const BASE_URL ='https://api.emailjs.com/api/v1.0/email/send';

export interface messageDetails {
  from: string;
  fromAddress: string;
  message: string;
  subject: string;
  to: string;
  toAddress: string;
}

export interface ecardAPIRequest {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: messageDetails;
}

export default {

  endpoints: {
    sendEcard: async (requestBody: messageDetails) => {

      const data: ecardAPIRequest = {
        service_id: 'gmail',
        template_id: 'template_dBuDl7KX',
        user_id: 'user_trqxrfrmltOA3ESCqzNKM',
        template_params: {
          ...requestBody
        }
      };

      const configuration = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

      return axios.post(`${BASE_URL}`, data, configuration)
        .then(response => response);
    }
  },

};

