import { Request, Response, NextFunction } from 'express';
import { userService } from '../api/users/services/userService';

const auth = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const us = new userService();
        const data = us.getUserByToken(req);

        if (data) {
            req.user = data;
            return next(); 
        }
        return res.status(403).json({detail: 'unAuthorized'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

module.exports = {
    auth,
}