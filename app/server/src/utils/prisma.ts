import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { DATABASE_URL } from "../constants/env.const.js";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// シングルトン
export const prisma = globalThis.__prisma ??= new PrismaClient({
  adapter: new PrismaMariaDb(DATABASE_URL)
});
