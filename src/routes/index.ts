import { Router } from "express";
import { usersRoutes } from "./user-routes";
import { authRoutes } from "./auth-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", ensureAuthenticated, usersRoutes);

export { routes };