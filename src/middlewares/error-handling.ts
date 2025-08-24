import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction){
    
    //verifica se o erro é uma instância da nossa classe, aí vai ser um erro interno
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message: error.message });
    };

    //erro de email duplicado pelo firebase authenticator
    if(error.code === "auth/email-already-exists"){
        return res.status(409).json({ message: "E-mail já está cadastrado" });
    }
    //erro de email/senha inválidos pelo firebase authenticator
    if(error.code === "auth/invalid-credential"){
        return res.status(401).json({ message: "E-mail ou senha inválidos!" });
    }
    

    //retorna um erro genérico se nao cair em nenhuma das cond
    return res.status(500).json({ message: error.message });
}