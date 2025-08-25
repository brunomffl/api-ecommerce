import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";
import { celebrate, Segments } from "celebrate";
import { userSchema } from "@/schemas/user-schema";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const usersRoutes = Router();
const usersController = new UsersController();

//adicionar rotas de usuários
usersRoutes.get("/", ensureAuthenticated, usersController.index);
usersRoutes.get("/:id", ensureAuthenticated, usersController.show);
usersRoutes.post("/", celebrate({ [Segments.BODY]: userSchema }),usersController.create);
usersRoutes.put("/:id", ensureAuthenticated, celebrate({ [Segments.BODY]: userSchema }),usersController.update);
usersRoutes.delete("/:id", ensureAuthenticated, usersController.delete);

export { usersRoutes };