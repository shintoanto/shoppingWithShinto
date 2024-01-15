import express from "express";
import { newProduct, product } from "../controller/productController.js";
const routes = express.Router();


routes.route('/product').get(product);

routes.route("/admin/products").post(newProduct);

export default routes;