import express from "express"
import { jwtMiddleware } from "../utils/authMiddleware.js";
import { signup, login } from "../controllers/authController.js";
import { progress } from "../controllers/progressController.js";
const router = express.Router();

// Sample route: GET /
router.get('/', (req, res) => {
  res.send('Hello world');
});

router.post('/signup', signup);
router.post('/login', login);

router.get('/progress', jwtMiddleware, progress);
router.get('/profile', jwtMiddleware, (req, res)=> res.send("profile page"));


export default router;
