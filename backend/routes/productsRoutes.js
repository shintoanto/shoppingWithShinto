import express from "express";
import { deleteSingleProduct, getSingleProduct, newProduct, product, updateProduct } from "../controller/productController.js";
import { isUserAuthentic } from "../middleware/authenticUser.js";
const routes = express.Router();


routes.route('/product').get(isUserAuthentic,product);

console.log("/products/getproduct");

routes.route("/admin/products").post(newProduct);

routes.route("/product/:id").get(getSingleProduct);

routes.route("/product/:id").put(updateProduct);

routes.route("/product/:id").delete(deleteSingleProduct);

export default routes;