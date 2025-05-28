import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Post, PostDocument } from './posts.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  private readonly imgbbApiKey = process.env.IMGBB_API_KEY;

  private async uploadToImgbb(imageBase64: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('image', imageBase64);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${this.imgbbApiKey}`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.data.url;
  }

  async create(createPostDto: CreatePostDto, userId: string) {
  const newPost = new this.postModel({
    ...createPostDto,
    author: userId,
  });
  return await newPost.save();
}
  findAll() {
    return this.postModel.find().populate('author', 'username _id').exec();
  }
  findOne(id: string) {
    return this.postModel.findById(id).exec();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
