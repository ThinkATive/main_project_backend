import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '../colors/entities/color.entity';
import { Gender } from '../genders/entities/gender.entity';
import { Material } from '../materials/entities/material.entity';
import { Size } from '../sizes/entities/size.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: [
        // 'productSubCategory',
        'brand',
        'season',
        // 'materials',
        // `colors`,
        // `sizes`,
        // `genders`,
      ],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: [
        'productSubCategory',
        'brand',
        'season',
        // 'materials',
        // `colors`,
        // `sizes`,
        // `genders`,
      ],
    });
  }

  findAllWithDeleted() {
    return this.productsRepository.find({
      withDeleted: true,
      relations: [
        'productSubCategory',
        'brand',
        'season',
        // 'materials',
        // `colors`,
        // `sizes`,
        // `genders`,
      ],
    });
  }

  async create({ createProductInput }) {
    const {
      brandId,
      seasonId,
      // productSubCategoryId,
      // materials,
      // colors,
      // sizes,
      // genders,
      ...product
    } = createProductInput;

    // const materialList = [];
    // for (let i = 0; i < materials.length; i++) {
    //   const prevMaterial = await this.materialRepository.findOne({
    //     where: { materialName: materials[i] },
    //   });

    //   if (prevMaterial) materialList.push(prevMaterial);
    //   else {
    //     const newMaterial = await this.materialRepository.save({
    //       materialName: materials[i],
    //     });
    //     materialList.push(newMaterial);
    //   }
    // }

    // const colorList = [];
    // for (let i = 0; i < colors.length; i++) {
    //   const prevColor = await this.colorRepository.findOne({
    //     where: { colorName: colors[i] },
    //   });

    //   if (prevColor) colorList.push(prevColor);
    //   else {
    //     const newColor = await this.colorRepository.save({
    //       colorName: colors[i],
    //     });
    //     colorList.push(newColor);
    //   }
    // }

    // const sizeList = [];
    // for (let i = 0; i < sizes.length; i++) {
    //   const prevSize = await this.sizeRepository.findOne({
    //     where: { sizeName: sizes[i] },
    //   });

    //   if (prevSize) sizeList.push(prevSize);
    //   else {
    //     const newSize = await this.sizeRepository.save({
    //       sizeName: sizes[i],
    //     });
    //     sizeList.push(newSize);
    //   }
    // }

    // const genderList = [];
    // for (let i = 0; i < genders.length; i++) {
    //   const prevGender = await this.genderRepository.findOne({
    //     where: { genderName: genders[i] },
    //   });

    //   if (prevGender) genderList.push(prevGender);
    //   else {
    //     const newGender = await this.genderRepository.save({
    //       genderName: genders[i],
    //     });
    //     genderList.push(newGender);
    //   }
    // }

    const result = await this.productsRepository.save({
      ...product,
      brand: { id: brandId },
      season: { id: seasonId },
      // productSubCategory: { id: productSubCategoryId },
      // materials: materialList,
      // colors: colorList,
      // genders: genderList,
      // sizes: sizeList,
    });

    return result;
  }

  async checkStock({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    // if (!product.isStock) {
    //   throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    // }
  }

  async update({ productId, updateProductInput }) {
    const originProductData = await this.productsRepository.findOne({
      where: { id: productId },
    });

    return this.productsRepository.save({
      ...originProductData,
      id: productId,
      ...updateProductInput,
    });
  }

  async delete({ productId }) {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const isRestored = await this.productsRepository.restore({ id: productId });
    return isRestored.affected ? true : false;
  }
}
