import { Request, Response } from "express";
import { UserServices } from "@/services";

class UsersController {

    async create(req: Request, res: Response) {
        const user = req.body;
        await new UserServices().create(user);

        return res.status(201).json({ message: "Usuário criado com sucesso!" });
    }

    async index(req: Request, res: Response) {
        return res.status(200).json(await new UserServices().index());
    };

    async show(req: Request, res: Response) {
        const { id } = req.params;

        return res.status(200).json(await new UserServices().show(id));
    };

    async update(req: Request, res: Response) {

        const { id } = req.params;
        const { nome, email } = req.body;

        await new UserServices().update(id, nome, email);

        return res.status(204).json({ message: "Usuário atualizado com sucesso!" })
    };

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        
        await new UserServices().delete(id);

        return res.status(204).json({ message: "Usuário deletado com sucesso!" });
    }

};

export { UsersController };