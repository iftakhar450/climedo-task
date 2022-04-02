import { Request, Response } from 'express';
import * as crypto from 'crypto';

import { User, UserInput } from '../models/user.model';

const hashPassword = (password: string) => {
    // const salt = crypto.randomBytes(16).toString('hex');
    // Hashing salt and password with 100 iterations, 64 length and sha512 digest
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT_KEY, 100, 64, `sha512`).toString(`hex`);
    
};

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

    const userCreated = await User.create(userInput);

    return res.status(201).json({ data: userCreated });
};

const getAllUsers = async (req: Request, res: Response) => {

    const users = await User.find().sort('-createdAt').exec();
    if (users) return res.status(200).json({ users: users });
    return res.status(200).json({ message: 'No user available' });

};

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
        return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
    return res.status(200).json({ data: user });
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { enabled, fullName, role } = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
        return res.status(404).json({ message: `User with id "${id}" not found.` });
    }

    if (!fullName || !role) {
        return res.status(422).json({ message: 'The fields fullName and role are required' });
    }

    await User.updateOne({ _id: id }, { enabled, fullName, role });

    const userUpdated = await User.findById(id);

    return res.status(200).json({ data: userUpdated });
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'User deleted successfully.' });
};

export { createUser, deleteUser, getAllUsers, getUser, updateUser };