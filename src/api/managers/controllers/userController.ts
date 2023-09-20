import { Request, Response } from "express";
import Joi from "joi";
import { userService } from "../services/userService";
import { userType } from "../../../entity/Users";
import { ItemTypes } from "../../../entity/itemTypes";
import { Items } from "../../../entity/Items";

exports.getCustomers = async (req: Request, res: Response) => {
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

exports.saveItemType = async (req:Request, res:Response) => {
    try {
        if (req.user?.userType !== userType.manager) 
            return res.status(403).json({detail: 'manager not found!' });

        const schema = Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(401).json({detail: error.message});

        const us = new userService(); 
        const itemType: ItemTypes = value;
        const result = await us.saveItemType(itemType);
        if (!result) return res.status(401).json({detail: 'not saved itemType'});
        return res.status(200).json(result); 
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

exports.updateItemType = async (req:Request, res:Response) => {
    try {
        if (req.user?.userType !== userType.manager) 
            return res.status(403).json({detail: 'manager not found!' });

        const schema = Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(),
        })

        const id: number = parseInt(req.params.id);

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(401).json({detail: error.message});

        const us = new userService(); 
        const itemType: ItemTypes = {
            ...value,
            id,
        };

        const result = await us.saveItemType(itemType);
        if (!result) return res.status(401).json({detail: 'not saved itemType'});
        return res.status(200).json(result); 
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

exports.getItemType =async (req:Request, res:Response) => {
    try {
        if (req.user?.userType !== userType.manager) 
            return res.status(403).json({detail: 'manager not found!' });

        const us = new userService();
        const data = await us.getItemType();
        if (!data) return res.status(403).json({detail: `not found data`});
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

exports.saveItems =async (req:Request, res: Response) => {
    try {
        if (req.user?.userType !== userType.manager) 
            return res.status(403).json({detail: 'manager not found!' });
        
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().optional(),
            itemTypeId: Joi.number().required(),
        })

        let { error, value } = schema.validate(req.body);
        if (error) return res.status(403).json(error);

        if (req.params.iid) {
            value = {
                ...value,
                id: req.params.iid,
            }
        }

        const items: Items = value;

        const us = new userService();
        const data =  await us.saveItem(items);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

exports.getItems =async (req:Request, res:Response) => {
    try {
        if (req.user?.userType !== userType.manager) 
            return res.status(403).json({detail: 'manager not found!' });

        const us = new userService();
        const data = await us.getItems();
        if (!data) return res.status(403).json({detail: `not found data`});
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}