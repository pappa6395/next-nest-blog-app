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
}
