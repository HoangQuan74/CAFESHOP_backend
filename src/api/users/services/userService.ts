import { Users } from "../../../entity/Users";
import { AppDataSource } from "../../../ormconfig";
import { Common } from "../../../common/common";
import { Request, Response } from "express";

export class userService {
  public getUserLogin = async (email: string, password: string) => {
    try {
      const repository = AppDataSource.getRepository(Users);
      const data: Users = await repository.findOne({
        where: {
          email: email,
          password: password,
        },
      });
      return data;
    } catch (e) {
      throw e;
    }
  };

  public login = async (user: Users) => {
    try {
      const common = new Common();
      const token = await common.makeToken(user.id, user.userType);
      user.token = token;
      this.saveUser(user);

      const returnData = {
        token: token,
        user: user,
      };
      return returnData;
    } catch (e) {
      throw e;
    }
  };

  public saveUser = async (user: Users) => {
    try {
      const repository = AppDataSource.getRepository(Users);
      const result = await repository.save(user);
      return result;
    } catch (e) {
      throw e;
    }
  };

  public getUserByToken = async (req: Request) => {
    try {
      if (!req.headers?.token) return {};

      const repository = AppDataSource.getRepository(Users);
      return repository.findOne({
        where: {
          token: req.headers.token,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  public logout = async (req: Request) => {
    try {
      if (!req.headers.token) return false;

      const repository = AppDataSource.getRepository(Users);
      repository.update({ token: req.headers.token }, { token: null });

      return true;
    } catch (e) {
      throw e;
    }
  };
}
