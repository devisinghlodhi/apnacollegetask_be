import { PrismaClient } from "@prisma/client";
import {data} from '../data.js';
const prisma = new PrismaClient();


const topicdata = async (req, res) => {
    try {
      const { userId } = req.user;
      const allTopics = await prisma.Topic.findMany({
        where: {
          userId,
        },
        select: {
          topicId: true,
        }
      });
      const topicIds = allTopics.map((item)=> item.topicId)
      console.log(topicIds)
      const finalData = data.map((item)=>{
        if(topicIds.includes(String(item.id))){
          item.status = true
        }else{
          item.status = false
        }
        return item;
      })
      // return res.status(200).json({ data });
      return res.status(200).json({ data: finalData });
    } catch (error) {
      console.error('Error in updatetopic:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
};


const updatetopic = async (req, res) => {
  const { topicId, level, isDone } = req.body;
  const { userId } = req.user;

  if (!topicId || !level) {
    return res.status(400).json({ message: 'topicId and level are required.' });
  }

  try {
    const existingTopic = await prisma.Topic.findFirst({
      where: {
        topicId,
        userId,
      },
    });

    // If record exists and isDone is false → delete it
    if (existingTopic && isDone === false) {
      await prisma.Topic.delete({
        where: {
          id: existingTopic.id,
        },
      });

      return res.status(200).json({
        message: 'Topic deleted successfully as isDone is false.',
      });
    }

    // If topic already exists and isDone is true → return it
    if (existingTopic) {
      return res.status(200).json({
        message: 'Topic already exists for this user.',
        topic: existingTopic,
      });
    }

    // If it doesn't exist and isDone is true → create new topic
    if (isDone === true) {
      const newTopic = await prisma.Topic.create({
        data: {
          topicId,
          difficulty: level,
          userId,
        },
      });

      return res.status(201).json({
        message: 'New topic created successfully.',
        topic: newTopic,
      });
    }

    return res.status(400).json({ message: 'Invalid isDone value.' });

  } catch (error) {
    console.error('Error in updatetopic:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};


export { topicdata, updatetopic };