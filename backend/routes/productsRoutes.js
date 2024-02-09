import express from "express";
import { deleteSingleProduct, getSingleProduct, newProduct, product, updateProduct } from "../controller/productController.js";
import { authorizeuserRole, isUserAuthentic } from "../middleware/authenticUser.js";
const routes = express.Router();


routes.route('/product').get(product);


routes.route("/admin/products").post(isUserAuthentic,authorizeuserRole("admin"),newProduct);

routes.route("/product/:id").get(getSingleProduct);

routes.route("/product/:id").put(isUserAuthentic,authorizeuserRole("admin"),updateProduct);

routes.route("/product/:id").delete(isUserAuthentic,authorizeuserRole("admin"),deleteSingleProduct);

export default routes;