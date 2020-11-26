import axios from 'axios';

const apiTechno = axios.create({
    baseURL: 'http://ecs-pagamento-api-staging-916485757.us-east-1.elb.amazonaws.com/api/v1'
});

export default apiTechno;