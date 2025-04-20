import { PrismaClient } from "@prisma/client";
import {data} from '../data.js';
const prisma = new PrismaClient();


const topicdata = (req, res) => {
    return res.status(200).json({ data });
};


export { topicdata };