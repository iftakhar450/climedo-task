import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { token_authentication } from '../middlewares/auth.middleware';

const authRoute = () => {

    const router = Router();

    router.post('/login', login);
    // router.post('/sign_out', sign_out);

    return router;
};

export { authRoute };