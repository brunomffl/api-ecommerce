import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";
import { celebrate, Segments } from "celebrate";
import { userSchema } from "@/schemas/user-schema";

const usersRoutes = Router();
const usersController = new UsersController();

//adicionar rotas de usuários
usersRoutes.get("/", usersController.index);
usersRoutes.get("/:id", usersController.show);
usersRoutes.post("/", celebrate({ [Segments.BODY]: userSchema }),usersController.create);
usersRoutes.put("/:id", celebrate({ [Segments.BODY]: userSchema }),usersController.update);
usersRoutes.delete("/:id", usersController.delete);

export { usersRoutes };