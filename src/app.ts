import 'express-async-errors';
import express from "express";
import { errors } from "celebrate";
import { initializeApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

initializeApp();
initializeFirebaseApp({
    apiKey: process.env.API_KEY
})
const app = express();

app.use(express.json());

app.use(routes);

app.use(errors()); // Celebrate errors PRIMEIRO
app.use(errorHandling); // Seu middleware customizado DEPOIS

export { app };