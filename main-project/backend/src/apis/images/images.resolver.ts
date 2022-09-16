import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CreateImageInput } from './dto/createImage.input';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Resolver()
export class ImagesResolver {
  constructor(
    private readonly imagesService: ImagesService, //
  ) {}

  @Mutation(() => [String])
  uploadImages(
    @Args({ name: 'images', type: () => [GraphQLUpload] }) images: FileUpload[], //
  ) {
    return this.imagesService.upload({ images });
  }

  @Mutation(() => [Image]) // () => code-first를 위한 리턴타입
  createImage(
    @Args('createImageInput') createImageInput: CreateImageInput, //
  ) {
    return this.imagesService.create({ createImageInput });
  }
}
