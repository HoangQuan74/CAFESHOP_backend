import { Users } from "../../../entity/Users";
import { AppDataSource } from "../../../ormconfig";
import { Common } from "../../../common/common";
import { Request, Response } from "express";
import { Cart } from "../../../entity/Cart";

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
      let result;
      let oldData;
      if(user.id){
        oldData = await repository.findOne({
          where: {
            id: user.id,
          }
        })
      }
      if (oldData) {
        user.id = oldData.id;
        result = await repository.save(user);
      }else{
        const checkEmail = await repository.findOne({
          where: {
            email: user.email,
          }
        })
        if (checkEmail) return false;
        result = await repository.save(user);
        const repositoryCart = AppDataSource.getRepository(Cart);
        const cart: Cart = {
          userId: result.id,
        }
        await repositoryCart.save(cart);
      }
      return result;
    } catch (e) {
      throw e;
    }
  };

  public getUserByToken = async (req: Request) => {
    try {
      console.log(req.headers);
      if (!req.headers?.authorization) return false;

      const repository = AppDataSource.getRepository(Users);
      return repository.findOne({
        where: {
          token: req.headers.authorization,
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
