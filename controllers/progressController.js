import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const progress = (req, res) => {

    const data = {
        "easy": 40,
        "medium": 30,
        "hard": 30
      }
      
    return res.status(200).json({ data });
  };


export { progress };