import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({ data: createCategoryDto });
    } catch (error) {
      throw new BadRequestException('Error creating category', {
        cause: error,
        description: 'Error prisma',
      });
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new BadRequestException('Error fetching categories', {
        cause: error,
        description: 'Error prisma',
      });
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.category.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND, {
        cause: error,
        description: 'Error prisma',
      });
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new BadRequestException('Error updating category', {
        cause: error,
        description: 'Error prisma',
      });
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.category.delete({ where: { id } });
      return;
    } catch (error) {
      throw new BadRequestException('Category not found', {
        cause: error,
        description: 'Error prisma',
      });
    }
  }
}
