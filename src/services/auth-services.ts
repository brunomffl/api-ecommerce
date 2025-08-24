import { User } from "@/schemas/user-schema";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

class AuthService {

    async create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome,
        });
    }

    async login(email: string, password: string): Promise<UserCredential>{
        return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    }
};

export { AuthService };