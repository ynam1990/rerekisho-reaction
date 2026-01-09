import { prisma } from "./prisma.js";

// 終了時処理の予約（dbコネクション解放）
const cleanup = async () => {
  await prisma.$disconnect();
  console.log(`Prisma connection disconnected.`);
};

process.on('SIGINT', async () => {
  await cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await cleanup();
  process.exit(0);
});

process.on('beforeExit', async () => {
  await cleanup();
});
