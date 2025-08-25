import { User } from "@/schemas/user-schema";

declare global {
    namespace Express{
        export interface Request {
            user: User;
        }
    }
}