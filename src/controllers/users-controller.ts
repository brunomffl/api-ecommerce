import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

type User = {
    id: string,
    nome: string,
    email: string
}

class UsersController{
    async create(req: Request, res: Response){
        const user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user);

        return res.json({ message: `Usuário ${ userSalvo.id } criado com sucesso!` });
    }

    async index(req: Request, res: Response){
        const snapshot = await getFirestore().collection("users").get();
        //mapeando os usuários e transformando em um array
        const users = snapshot.docs.map(doc => {

            return {
                id: doc.id,
                ...doc.data()
            };
        });

        return res.json(users);
    };

    async show(req: Request, res: Response){
        const { id } = req.params;
        const doc = await getFirestore().collection("users").doc(id).get();
        const user = { 
            id: doc.id, 
            ...doc.data() 
        }
        return res.json(user)
    };

    async update(req: Request, res: Response){
        const { id } = req.params;
        const { nome, email } = req.body;

        await getFirestore().collection("users").doc(id).set({
            nome,
            email
        });

        return res.json({ message: `Usuário atualizado com sucesso!` });
    };

    async delete(req: Request, res: Response){
        const { id } = req.params;
        await getFirestore().collection("users").doc(id).delete();

        return res.json({ message: "Usuário excluído com sucesso!" })
    }

};

export { UsersController };