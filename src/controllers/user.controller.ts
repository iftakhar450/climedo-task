import { Request, Response } from 'express';
import * as crypto from 'crypto';

import { User, UserInput } from '../models/user.model';
import { App_Constants } from '../config/constants';

/**
 * Middleware to generate the password hash to store in database
 * @param password 
 * @returns 
 */
const hashPassword = (password: string) => {
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT_KEY, 100, 64, `sha512`).toString(`hex`);
};

/**
 * Create new user middleware
 * @param req 
 * @param res 
 * @returns 
 */
const createUser = async (req: Request, res: Response) => {
    const { email, fullName, password, role, dob } = req.body;
    if (!email || !fullName || !password || !role || !dob) {
        return res.status(422).json({ message: 'The fields email, fullName, password, DoB and role are required' });
    }
    const userInput: UserInput = {
        fullName,
        email,
        password: hashPassword(password),
        role,
        dob
    };
    try {
        let userCreated = await User.create(userInput);
        let user = {
            fullName: userCreated.fullName,
            email: userCreated.email,
            role: userCreated.role,
            dob: userCreated.dob,
        }
        return res.status(201).json({ data: user });

    } catch (e) {
        if (e.code == 11000)
            return res.status(400).json({ error: 'User already exists with this email' });
        return res.status(400).json({ error: e })

    }

};


/**
 * Middleware to fetch all users for admin
 * @param req 
 * @param res 
 * @returns 
 */
const getAllUsers = async (req: Request, res: Response) => {
    if (req.body.user.role == App_Constants.ADMIN_ROLE) {
        let keys = { updatedAt: 0, password: 0, __v: 0 };
        try {
            const users = await User.find({}, keys).sort('-createdAt').exec();
            if (users) return res.status(200).json({ users: users });
            return res.status(200).json({ message: 'No user available' });
        } catch (e) {
            return res.status(400).json({ error: e })
        }
    } else {
        return res.status(200).json({ users: [] });
    }



};


/**
 * Middleware Fetch one user by Id
 * @param req 
 * @param res 
 * @returns 
 */
const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    let keys = { updatedAt: 0, password: 0, __v: 0 };
    try {
        const user = await User.findOne({ _id: id }, keys).exec();
        if (!user) {
            return res.status(404).json({ message: `User with id "${id}" not found.` });
        }
        return res.status(200).json({ data: user });
    } catch (e) {
        return res.status(400).json({ error: e })
    }

};


/**
 * Middleware to update the user information
 * @param req 
 * @param res 
 * @returns 
 */
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dob, fullName, role } = req.body;
    if (req.body.user.role == App_Constants.ADMIN_ROLE || id == req.body.user.uid) {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: `User with id "${id}" not found.` });
        }
        if (!fullName || !role) {
            return res.status(422).json({ message: 'The fields fullName,dob and role are required' });
        }
        try {

            await User.updateOne({ _id: id }, { dob, fullName, role });
            const userUpdated = await User.findById(id);
            let user = {
                fullName: userUpdated.fullName,
                role: userUpdated.role,
                dob: userUpdated.dob,
            }
            return res.status(200).json({ data: user });
        } catch (e) {
            return res.status(400).json({ error: e })
        }
    } else {
        return res.status(200).json({ message: `You are not allowed to perform this operation` });
    }


};

/**
 * Middleware delete user by Id
 * @param req 
 * @param res 
 * @returns 
 */

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.body.user.role == App_Constants.ADMIN_ROLE) {
        try {
            await User.findByIdAndDelete(id);
            return res.status(200).json({ message: 'User deleted successfully.' });
        } catch (e) {
            return res.status(400).json({ error: e })
        }
    } else {
        return res.status(200).json({ message: `You are not allowed to perform this operation` });
    }


};

export { createUser, deleteUser, getAllUsers, getUser, updateUser, hashPassword };