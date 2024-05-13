import express from "express";
import { getCategories } from "../getCategories";
import { createCategory } from "../createCategory";
import { updateCategory } from "../updateCategory";
import { deleteCategory } from "../deleteCategory";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
