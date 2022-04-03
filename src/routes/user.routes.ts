import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.controller';

import { token_authentication } from '../middlewares/auth.middleware'
const userRoute = () => {

    const router = Router();

    router.post('/', token_authentication, createUser);

    router.get('/', token_authentication, getAllUsers);

    router.get('/:id', token_authentication, getUser);

    router.patch('/:id', token_authentication, updateUser);

    router.delete('/:id', token_authentication, deleteUser);

    return router;
};

export { userRoute };