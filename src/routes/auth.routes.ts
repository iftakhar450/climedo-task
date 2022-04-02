import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const authRoute = () => {

    const router = Router();

    router.post('/login', login);

    return router;
};

export { authRoute };