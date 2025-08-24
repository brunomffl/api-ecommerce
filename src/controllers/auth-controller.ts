import { Request, Response } from "express";
import { AuthService } from "@/services/auth-services";

class AuthController {
    async login(req: Request, res: Response){
        const { email, password } = req.body

        const userRecord = await new AuthService().login(email, password);

        const token = await userRecord.user.getIdToken(true);

        return res.send({
            token
        })
    }
};

export { AuthController }