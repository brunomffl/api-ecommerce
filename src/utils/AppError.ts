/* classe que vai jogar um erro caso seja interno */
export class AppError {
    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}