import { Users, userType } from "../../../entity/Users";
import { AppDataSource } from "../../../ormconfig";

export class userService {
    public getCustomers =async () => {
        try {
            const repository = AppDataSource.getRepository(Users);
            const data = repository.find({ where: {userType: userType.customer }});
            return data;
        } catch (e) {
            throw e;
        }
    }

}