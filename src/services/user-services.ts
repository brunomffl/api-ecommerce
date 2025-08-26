import { User } from "@/schemas/user-schema";
import { getFirestore } from "firebase-admin/firestore";
import { AppError } from "@/utils/AppError";
import { AuthService } from "./auth-services";

class UserServices{

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }

    async index(): Promise<User[]>{
        const snapshot = await getFirestore().collection("users").get();
        //mapeando os usuários e transformando em um array
        return snapshot.docs.map(doc => {

            return {
                id: doc.id,
                ...doc.data()
            };
        }) as User[];

    };

    async show(id: string): Promise<User>{

        const doc = await getFirestore().collection("users").doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        } else {
            throw new AppError("Usuário não encontrado", 404);
        }
    }

    async create(user: User): Promise<void>{
        const userAuth = await this.authService.create(user);
        
        const { password, ...userData } = user;
        
        const userWithUid = {
            ...userData,
            id: userAuth.uid
        };

        await getFirestore().collection("users").doc(userAuth.uid).set(userWithUid);
    }

    async update(id: string, user: User): Promise<void>{
        await this.authService.update(id, user);

        const { password, ...userData } = user;
        await getFirestore().collection("users").doc(id).set(userData, { merge: true });
    }

    async delete(id: string): Promise<void>{
        const user = await getFirestore().collection("users").doc(id);
        const doc = await user.get();

        await this.authService.delete(id);

        if(!doc.exists){
            throw new AppError("Usuário não encontrado!", 404)
        };

        await getFirestore().collection("users").doc(id).delete();
    }

};

export { UserServices };