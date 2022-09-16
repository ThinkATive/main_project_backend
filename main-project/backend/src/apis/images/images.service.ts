import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { getToday } from 'src/commons/libraries/utils';
import { FileUpload } from 'graphql-upload';

interface IUpload {
  images: FileUpload[];
}

const { STORAGE_BUCKET, STORAGE_KEY_FILENAME, STORAGE_PROJECT_ID } =
  process.env;

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  async upload({ images }: IUpload) {
    const storage = new Storage({
      projectId: STORAGE_PROJECT_ID,
      keyFilename: STORAGE_KEY_FILENAME,
    }).bucket(STORAGE_BUCKET);

    const imageFiles = await Promise.all(images);
    const imageUrls = await Promise.all(
      imageFiles.map(
        (ele) =>
          new Promise((resolve, reject) => {
            const imgName = `${getToday()}/${uuidv4()}/origin/${ele.filename}`;
            ele
              .createReadStream()
              .pipe(storage.file(imgName).createWriteStream())
              .on('finish', () => resolve(`${STORAGE_BUCKET}/${imgName}`))
              .on('error', (error) => reject(error));
          }),
      ),
    );

    return imageUrls;
  }

  async create({ createImageInput }) {
    const { productId, productImages } = createImageInput;

    const results = await Promise.all(
      productImages.map((ele) =>
        this.imagesRepository.save({
          imageUrl: ele,
          product: { id: productId },
        }),
      ),
    );

    return results;
  }
}
