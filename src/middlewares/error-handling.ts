import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction){
    //verifica se o erro é uma instância da nossa classe, aí vai ser um erro interno
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message: error.message });
    };

    //retorna um erro genérico se nao cair em nenhuma das cond
    return res.status(500).json({ message: error.message });
}