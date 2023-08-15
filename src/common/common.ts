import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export class Common {
  public makeToken = async (id: number, userType: string) => {
    try {
      let token = jwt.sign({
        id: id,
        userType: userType,
      },
      JWT_SECRET
      );
      return token;
    } catch (e) {
      throw e;
    }
  };
}
