import { Link, PrismaClient, Profile, User } from '@prisma/client';

export type RequireOne<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  {
    [P in K]-?: T[P];
  };

interface BaseRepository {
  disconnect: () => Promise<void>;
}

interface UserRepository extends BaseRepository {
  getUser: (userId: string) => Promise<User | null>;
  insertUser: (user: UserDTO) => Promise<User>;
  insertProfile: (user: ProfileDTO, userId: number) => Promise<Profile>;
}

interface LinkRepository extends BaseRepository {
  getLink: (linkId: number) => Promise<Link | null>;
}

export type UserDTO = RequireOne<User, 'userIss' | 'email'>;

export type ProfileDTO = RequireOne<Profile, 'userName'>;

class PrismaDB implements UserRepository, LinkRepository {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getLink(linkId: number) {
    return await this.prismaClient.link.findOne({
      where: {
        id: linkId,
      },
    });
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
        userIss: user.userIss,
        active: true,
      },
    });
  }

  async insertProfile(profile: ProfileDTO, userId: number) {
    return await this.prismaClient.profile.create({
      data: {
        userName: profile.userName,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}

export { PrismaDB };
