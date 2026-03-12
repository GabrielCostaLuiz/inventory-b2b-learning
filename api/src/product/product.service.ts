import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      throw new BadRequestException('Error creating product', {
        cause: error,
      });
    }
  }

  async findAll() {
    try {
      return this.prisma.product.findMany();
    } catch (error) {
      throw new BadRequestException('Error finding products', {
        cause: error,
      });
    }
  }

  async findOne(id: number) {
    try {
      return this.prisma.product.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Error finding product', {
        cause: error,
      });
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new BadRequestException('Error updating product', {
        cause: error,
      });
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Error removing product', {
        cause: error,
      });
    }
  }
}
