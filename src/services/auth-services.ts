import { User } from "@/schemas/user-schema";
import { getAuth, UserRecord } from "firebase-admin/auth";

class AuthService {

    async create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome,
        });
    }
};

export { AuthService };