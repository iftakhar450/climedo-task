import { Router } from 'express';
import { userRoute } from './user.routes';

const routes = Router();

routes.use('/users', userRoute());


export default routes;