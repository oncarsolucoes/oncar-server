import { Router } from 'express';

import TechnoSpeedController from './controllers/TechnoSpeedController';

const routes = Router();

routes.post('/payer', TechnoSpeedController.createPayer);
// routes.get('/showpayer', TechnoSpeedController.verifyPayer);

export default routes;
