import express from "express";
import bodyParser from "body-parser";
import router from "./routes/route.js";
import { configDotenv } from "dotenv";
configDotenv()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json())

app.use("/api", router)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
