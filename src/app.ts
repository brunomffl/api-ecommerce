import 'express-async-errors';
import express from "express";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

initializeApp();
const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandling)

export { app };