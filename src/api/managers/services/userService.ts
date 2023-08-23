import { Users, userType } from "../../../entity/Users";
import { ItemTypes } from "../../../entity/itemTypes";
import { AppDataSource } from "../../../ormconfig";

export class userService {
    public getCustomers = async () => {
        try {
            const repository = AppDataSource.getRepository(Users);
            const data = repository.find({ where: {userType: userType.customer }});
            return data;
        } catch (e) {
            throw e;
        }
    }

    public saveItemType = async (itemType: ItemTypes) => {
        try {
            const repository = AppDataSource.getRepository(ItemTypes);
            const result = await repository.save(itemType);
            return result;
        } catch (e) {
            throw e;
        }
    }

    public getItemType = async () => {
        try {
            const repository = AppDataSource.getRepository(ItemTypes);
            const data = repository.find();
            return data;
        } catch (e) {
            throw e;
        }
    }

}