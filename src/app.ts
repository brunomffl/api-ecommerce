import 'express-async-errors';
import express from "express";
import { errors } from "celebrate";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

initializeApp();
const app = express();

app.use(express.json());

app.use(routes);

app.use(errors()); // Celebrate errors PRIMEIRO
app.use(errorHandling); // Seu middleware customizado DEPOIS

export { app };