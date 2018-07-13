import axios from 'axios';

export interface ecardAPIRequest {

}

export class EcardApi {

  static sendEcard = (config: ecardAPIRequest) => {
    const response = axios.post('', {
      ...config
    });
    response.then(
      resolve();
    )

  }

}
