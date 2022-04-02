import { Router } from 'express';
import { userRoute } from './user.routes';
import { authRoute } from './auth.routes';

const routes = Router();

routes.use('/users', userRoute());
routes.use('/', authRoute());


export default routes;