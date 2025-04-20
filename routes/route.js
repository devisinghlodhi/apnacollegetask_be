import express from "express"
const router = express.Router();

// Sample route: GET /
router.get('/', (req, res) => {
  res.send('Hello world');
});

router.get('/test', (req, res) => {
  res.send('Hello world test');
});


export default router;
