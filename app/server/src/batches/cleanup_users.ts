import { logError } from '../errors/log.js';
import { prisma } from '../utils/prisma.js';

export const cleanupUsers = async () => {
  const currentDate = new Date();
  const limitDate = new Date(currentDate);
  limitDate.setMonth(limitDate.getMonth() - 3);

  await prisma.$transaction(async (tx) => {
    const targetUsersList = await tx.user.findMany({
      where: {
        lastActiveAt: {
          lt: limitDate,
        },
        // 永続ユーザは削除対象外
        isPermanent: false,
      },
      select: {
        id: true,
      },
    });

    const targetUserIdsList = targetUsersList.map(user => user.id);
    if (targetUserIdsList.length === 0) {
      return 0;
    }

    await tx.session.deleteMany({
      where: {
        userId: {
          in: targetUserIdsList,
        }
      },
    });

    await tx.user.deleteMany({
      where: {
        id: {
          in: targetUserIdsList,
        }
      },
    });

    return targetUsersList.length;
  }).then(async (deletedCount) => {
    console.log(`[${ currentDate.toISOString() }] cleanupUsers completed. Deleted users count: ${ deletedCount }, Limit date: ${ limitDate.toISOString() }`);
  }).catch((error) => {
    logError(error, 'cleanupUsers');
  });  
};
