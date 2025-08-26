import { User } from "@/schemas/user-schema";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

class AuthService {

    async create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome,
        });
    };

    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email,
        };

        if(user.password){
            props.password = user.password;
        };

        await getAuth().updateUser(id, props);

    };

    async delete(id: string) {
        await getAuth().deleteUser(id);
    }

    async login(email: string, password: string): Promise<UserCredential>{
        return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    };
};

export { AuthService };