import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

declare const global: NodeJS.Global & typeof globalThis;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

const prisma = global.prisma;

export default prisma;
