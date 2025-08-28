import { Router } from "express";
import { AuthController } from "@/controllers/auth-controller";
import { celebrate, Segments } from "celebrate";
import { authLoginSchema, authRecoverySchema } from "@/schemas/user-schema";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", celebrate({ [Segments.BODY]: authLoginSchema }), authController.login);
authRoutes.post("/recovery", celebrate({ [Segments.BODY]: authRecoverySchema }), authController.recovery);

export { authRoutes };