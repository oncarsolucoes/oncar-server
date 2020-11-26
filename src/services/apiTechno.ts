import axios from 'axios';

const apiTechno = axios.create({
  baseURL: "https://staging.pagamentobancario.com.br/api/v1",
});

export default apiTechno;
