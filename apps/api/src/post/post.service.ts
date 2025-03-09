import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({skip=0, take=12}: {skip?: number; take?: number;}) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }
  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { 
        id 
      },
      include: {
        author: true,
        tags: true
      }
    });
  }

  async findByUser({userId, skip, take}: {userId: number; skip?: number; take?: number;}) {
    return await this.prisma.post.findMany({
      where: {
        author:{
          id: userId
        }
      },
      select: {
        id: true,
        content: true,
        title: true,
        slug: true,
        thumbnail: true,
        published: true,
        createdAt: true,
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      skip,
      take,
    });
  }
  

  async userPostCount(userId: number) {
    return await this.prisma.post.count({
      where: {
        author:{
          id: userId
        }
      },
    });
  }

  async create({createPostInput, authorId}:{createPostInput: CreatePostInput, authorId: number}) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: createPostInput.tags && createPostInput.tags.length > 0 ? {
          connectOrCreate: createPostInput.tags.map((tag) => ({         // Many to many relationship
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          }))
        } : undefined
      },
      include: { tags: true }
    });
  }
}
