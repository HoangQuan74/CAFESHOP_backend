import { Items } from "../../../entity/Items";
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
            if (itemType.id) {
                const oldData = repository.findOne({
                    where: {
                        id: itemType.id,
                    }
                });
            }
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

    public saveItem = async (item: Items) => {
        try {
            const repository = AppDataSource.getRepository(Items);
            const result = await repository.save(item);
            return result;
        } catch (e) {
            throw e;
        }
    }

    public getItems = async () => {
        try {
            const repository = AppDataSource.getRepository(Items);
            const data = repository.find();
            return data;
        } catch (e) {
            throw e;
        }
    }

    public deleteItem = async (id: number) => {
        try {
            const repository = AppDataSource.getRepository(Items);
            const data = repository.delete({id: id});
            return data;
        } catch (e) {
            throw e;
        }
    }

}