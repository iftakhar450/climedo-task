
import { IUser } from "./interfaces";
import { App_Constants } from "./constants";

export const Users_DATA: IUser[] = [
    {
        fullName: 'Test Admin',
        role: App_Constants.ADMIN_ROLE,
        dob: new Date('01.02.1995'),
        email: 'admin@example.com',
        password: 'admin'
    },
    {
        fullName: 'Test User',
        role: App_Constants.USER_ROLE,
        dob: new Date('04.04.1997'),
        email: 'user@example.com',
        password: 'user'
    }
];


