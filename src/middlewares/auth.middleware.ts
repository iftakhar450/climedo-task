import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'


/**
 * Middleware for token authentication on every request
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const token_authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['authorization'];
        if (token == null) return res.status(401).send('Authentication Token Required'); // if there isn't any token
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) return res.status(403).send("Token Expired");
            next();
        });
    } catch (e) {
        console.log(e)
    }

}

export { token_authentication };