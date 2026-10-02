import { createBookController, getBookByIdController, putBookController, deleteBookController} from "../controllers/book.controller.js";
import { Router } from "express";

const router = Router();

router.get("/:id", getBookByIdController);
router.post("/", createBookController);
router.put("/:id", putBookController);
router.delete("/:id", deleteBookController);

export default router;
