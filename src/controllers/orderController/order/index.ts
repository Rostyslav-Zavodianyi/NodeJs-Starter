import express from "express";
import { getOrders } from "../getOrders";
import { createOrder } from "../createOrder";
import { updateOrder } from "../updateOrder";
import { deleteOrder } from "../deleteOrder";
import { patchOrder } from "../patchOrder";

const router = express.Router();

router.get("/orders", getOrders);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.patch("/order/:id", patchOrder);
router.delete("/order/:id", deleteOrder);

export default router;
