import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new AppError("Token não encontrado", 401);
        }
    
        const [, token] = authHeader.split(" ");
    
        console.log(token);

        return next()

    } catch(error){
        if (error instanceof AppError){
            throw error
        }
        throw new AppError("JWT Inválido!", 401)
    }
}