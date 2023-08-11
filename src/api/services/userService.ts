import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";
import { AppDataSource } from "../../ormconfig";

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
            

            const returnData = {
                accessToken: 0,
                refreshToken: 0,
                user: user,
            }
            return ;
        } catch (e) {
            throw e;
        }
    }
}