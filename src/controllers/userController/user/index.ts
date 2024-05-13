import express from "express";
import { getUsers } from "../getUsers";
import { createUser } from "../createUser";
import { updateUser } from "../updateUser";
import { deleteUser } from "../deleteUser";
import { patchUser } from "../patchUser";
import { getUserStatsById } from "../getUserStats";

const router = express.Router();

router.get("/users", getUsers);
router.get("/userStats/:id", getUserStatsById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", patchUser);

export default router;
