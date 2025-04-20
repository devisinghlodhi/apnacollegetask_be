import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const progress = async (req, res) => {
  try {
    const { userId } = req.user;

    const allTopics = await prisma.Topic.findMany({
      where: {
        userId,
      },
      select: {
        difficulty: true,
      },
    });

    const totalTopics = allTopics.length;

    if (totalTopics === 0) {
      return res.status(200).json({ data: { easy: 0, medium: 0, hard: 0 } });
    }

    const difficultyCount = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    console.log(allTopics)
  
    for (const topic of allTopics) {
      const difficulty = topic.difficulty?.toLowerCase().trim(); // normalize the value
    
      if (difficultyCount.hasOwnProperty(difficulty)) {
        difficultyCount[difficulty]++;
      }
    }
    

    console.log(difficultyCount)

    const data = {
      easy: Math.round((difficultyCount.easy / totalTopics) * 100),
      medium: Math.round((difficultyCount.medium / totalTopics) * 100),
      hard: Math.round((difficultyCount.hard / totalTopics) * 100),
    };
  
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error in updatetopic:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export { progress };
