import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.interface';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    return this.postsRepository.save({
      ...createPostDto,
      author: user,
    });
  }

  async findAll(take: number = 10, skip: number = 0) {
    const keyword = '';
    const queryBuilder = this.postsRepository.createQueryBuilder('posts');
    const data = await queryBuilder
      .leftJoinAndSelect('posts.author', 'users')
      .where('posts.title like :title', { title: '%' + keyword + '%' })
      .orderBy('posts.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
    return data;
  }

  findOne(id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
