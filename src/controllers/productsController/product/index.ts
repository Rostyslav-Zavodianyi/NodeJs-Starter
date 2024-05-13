import express from "express";
import { getProducts } from "../getProducts";
import { createProduct } from "../createProduct";
import { updateProduct } from "../updateProduct";
import { deleteProduct } from "../deleteProduct";
import { patchProduct } from "../patchProduct";

const router = express.Router();

router.get("/products", getProducts);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.patch("/product/:id", patchProduct);
router.delete("/product/:id", deleteProduct);

export default router;
