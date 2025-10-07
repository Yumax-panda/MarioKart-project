import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type PrismaClientType = ReturnType<typeof getClient>;
let prisma: PrismaClientType | undefined;

function getClient(database_url: string) {
  return new PrismaClient({
    datasourceUrl: database_url,
  }).$extends(withAccelerate());
}

export const getPrisma = (database_url: string): PrismaClientType => {
  if (!prisma) {
    prisma = getClient(database_url);
  }
  return prisma;
};
