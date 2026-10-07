import { createBookController, getBookByIdController, putBookController, deleteBookController} from "../controllers/book.controller.js";
import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth-middleware.js";

const router = Router();

router.get("/:id", getBookByIdController);  

router.post("/", authenticateToken, authorizeRole('admin'), createBookController);

router.put("/:id", authenticateToken, authorizeRole('admin'), putBookController);

router.delete("/:id", authenticateToken, authorizeRole('admin'), deleteBookController);

export default router;
