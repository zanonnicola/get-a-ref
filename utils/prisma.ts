import { PrismaClient, User } from '@prisma/client';

export type RequireOne<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  {
    [P in K]-?: T[P];
  };

interface UserRepository {
  disconnect: () => Promise<void>;
  getUser: (userId: string) => Promise<User | null>;
  insertUser: (user: UserDTO) => Promise<User>;
}

export type UserDTO = RequireOne<User, 'userIss' | 'email' | 'userName'>;

class PrismaDB implements UserRepository {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async disconnect() {
    await this.prismaClient.$disconnect();
  }

  async getUser(userId: string) {
    return await this.prismaClient.user.findOne({
      where: {
        userIss: userId,
      },
    });
  }

  async insertUser(user: UserDTO) {
    return await this.prismaClient.user.create({
      data: {
        email: user.email,
        userName: user.userName,
        userIss: user.userIss,
      },
    });
  }
}

export { PrismaDB };
