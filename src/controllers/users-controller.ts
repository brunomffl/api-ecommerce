import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { AppError } from "@/utils/AppError";

type User = {
    id: string,
    nome: string,
    email: string
}

class UsersController {

    async create(req: Request, res: Response) {
        const user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user);

        return res.status(201).json({ message: `Usuário ${ userSalvo.id } criado com sucesso!` });
    }

    async index(req: Request, res: Response) {
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

    async show(req: Request, res: Response) {

        const { id } = req.params;
        const doc = await getFirestore().collection("users").doc(id).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            }
            return res.status(200).json(user)
        } else {
            throw new AppError("Usuário não encontrado", 404);
        }

    };

    async update(req: Request, res: Response) {

        const { id } = req.params;
        const { nome, email } = req.body;

        const docRef = getFirestore().collection("users").doc(id);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome,
                email,
            });

            return res.status(204);
        } else {
            throw new AppError("Usuário não encontrado", 404)
        }

    };

    async delete(req: Request, res: Response) {

        const { id } = req.params;
        await getFirestore().collection("users").doc(id).delete();

        return res.status(200);

    }

};

export { UsersController };