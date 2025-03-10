import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context, 
    @Args("postId", {type:() => Int!}) postId:number
  ) {
    const userId = context.req.user.id;
    return await this.likeService.likePost({ userId, postId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Context() context, 
    @Args("postId", {type:() => Int!}) postId:number
  ) {
    const userId = context.req.user.id;
    return await this.likeService.unlikePost({ userId, postId });
  }

  @Query(() => Int)
  postLikesCount(@Args('postId', {type:() => Int!}) postId:number) {
    return this.likeService.getPostLikesCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikedPost(
    @Context() context,
    @Args('postId', {type:() => Int!}) postId:number) {
      const userId = context.req.user.id
      return this.likeService.userLikedPost({postId, userId})
  }
}
