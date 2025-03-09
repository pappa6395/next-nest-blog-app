import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost({postId, userId}: {postId: number, userId: number}) {
    try {
      return !!(await this.prisma.like.create({
        data: {
          userId,
          postId
        }
      }));

    } catch (err) {
      throw new BadRequestException(`Failed to like post: ${err.message}`);
    }
  }

  async unlikePost({postId, userId}: {postId: number, userId: number}) {
    try {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });
      return true;

    } catch (err) {
      throw new BadRequestException(`Failed to unlike post: ${err.message}`);
    }
  }

  async getPostLikesCount(postId: number) {
    try {
      return await this.prisma.like.count({
        where: {
          postId
        }
      });

    } catch (err) {
      throw new BadRequestException(`Failed to get likes count: ${err.message}`);
    }
  }

  async userLikedPost({postId, userId} :{postId: number , userId: number}) {
    try {
      const like =  await this.prisma.like.findFirst({
        where: {
          postId,
          userId
        }
      })
      return !!like;

    } catch (err) {
      throw new BadRequestException(`Failed to check if user liked post: ${err.message}`);
    }
  }

}
