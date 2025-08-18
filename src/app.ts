import express from "express";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./routes";

initializeApp();
const app = express();

app.use(express.json());

app.use(routes);


export { app };