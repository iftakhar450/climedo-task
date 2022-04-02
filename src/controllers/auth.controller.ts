import { User } from "../models/user.model";
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken'
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(404).json({ message: `Email not found.` });
        if (!password) return res.status(404).json({ message: `Password not found.` });

        // fetch user detail
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return res.status(404).json({ message: `User with Email "${email}" not found.` });
        }

        // match password
        const isValidPassword = crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT_KEY, 100, 64, 'sha512').toString('hex') === user.password;
        if (!isValidPassword) return res.status(401).json({ error: { message: 'Invalid Password' } });

        // generate jwt
        const token = jwt.sign({ uid: user.get('_id') }, process.env.JWT_KEY, { expiresIn: '30m' });
        return res.status(200).json({ data: { token } });
    } catch (e) {
        console.log(e)
    }

}

export { login };