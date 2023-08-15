import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { AppDataSource } from "../../ormconfig";
import { Common } from "../../common/common";

export class userService {
    public getUserLogin = async (email: string, password: string) => {
        try {
            const repository = AppDataSource.getRepository(Users);
            const data: Users = await repository.findOne({
                 where: {
                    email: email,
                    password: password,
                 }
            })
            return data;
        } catch (e) {
            throw e;
        }
    }

    public login = async (user: Users) => {
        try {
            const common = new Common()
            const token = await common.makeToken(user.id, user.userType);
            user.token = token;
            this.saveUser(user);

            const returnData = {
                token: token,
                user: user,
            }
            return returnData;
        } catch (e) {
            throw e;
        }
    }

    public saveUser = async (user:Users) => {
        try {
            const repository = AppDataSource.getRepository(Users);
            const result = await repository.save(user);
            return result;
        } catch (e) {
            throw e;
        }
    }
}