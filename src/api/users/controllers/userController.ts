import { Request, Response } from "express";
import Joi, { number } from "joi";
import { userService } from "../services/userService";
import { Users } from "../../../entity/Users";

const login = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detail: error.message });

    const { email, password } = value;
    const us = new userService();
    const data = await us.getUserLogin(email, password);
    if (data) {
      const returnData = await us.login(data);
      return res.status(200).json(returnData);
    } else {
      return res.status(403).json({ detail: `email or password was wrong!` });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const us = new userService();
    const result = await us.logout(req);

    if (!result) return res.status(403).json({ detail: "you miss token" });
    return res.status(200).json({ detail: "logout successfull" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const signup = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.number().optional(),
            password: Joi.string().required(),
            birthDay: Joi.date().optional(),
            avata: Joi.string().optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(403).json(error);

        const user: Users = value;
        const us = new userService();
        const result = await us.saveUser(user);

        if (!result) return res.status(403).json({detail: 'email is exitsed!'});
        return res.status(200).json(result);        
    } catch (e) {
        console.log(e);
        return res.status(500).json({detail: e.message});
    }
};

module.exports = {
  login,
  logout,
  signup,
};
