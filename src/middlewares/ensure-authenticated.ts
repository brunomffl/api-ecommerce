import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { getAuth } from "firebase-admin/auth";
import { UserServices } from "@/services";

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new AppError("Token não encontrado", 401);
        }
    
        const [, token] = authHeader.split(" ");

        const decodedIdToken = await getAuth().verifyIdToken(token, true);

        const user = await new UserServices().show(decodedIdToken.uid);
        if(!user){
            throw new AppError("Acesso negado!", 403)
        }

        req.user = user;

        return next()

    } catch(error){
        if (error instanceof AppError){
            return next(error)
        }
        return next(new AppError("JWT Inválido!", 401))
    }
}