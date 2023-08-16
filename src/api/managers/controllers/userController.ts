import { Request, Response } from "express";
import Joi from "joi";
import { userService } from "../services/userService";
import { userType } from "../../../entity/Users";

const getCustomers = async (req: Request, res: Response) => {
    try {
        if (req.user?.userType !== userType.manager) 
            return res.status(403).json({ detail: 'manager not found!' });

        const us = new userService();
        const data = await us.getCustomers();
        if (!data) return res.status(400).json({detail: 'error getCustomer'});
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};

module.exports = {
    getCustomers,
};
