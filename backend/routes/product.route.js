
import express from "express";
import { deleteProduct, getProduct, postProduct, updateProduct } from "../controller/index.controller.js";
const router = express.Router();

router.get("/", getProduct)

router.post("/", postProduct)

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct)

export default router;
