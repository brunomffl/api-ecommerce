import { Router } from "express";
import { usersRoutes } from "./user-routes";
import { authRoutes } from "./auth-routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes);

export { routes };