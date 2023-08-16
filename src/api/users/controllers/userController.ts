import { Request, Response } from 'express';
import Joi from 'joi';
import { userService } from '../services/userService';

const login = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detail: error.message });

        const { email, password } = value;
        const us = new userService()
        const data = await us.getUserLogin(email, password);
        if (data) {
            const returnData = await us.login(data);
            return res.status(200).json(returnData);
        }else{
            return res.status(403).json({detail: `email or password was wrong!`});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        const us = new userService();
        const result = await us.logout(req);

        if (!result) return res.status(403).json({detail: 'you miss token'});
        return res.status(200).json({detail: 'logout successfull'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

module.exports = {
    login,
    logout,
}