/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, HttpException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  // Criamos um mock do objeto Prisma para cada método que usamos
  const mockPrisma = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: mockPrisma, // Substituímos o Prisma real pelo Mock
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Limpa os mocks após cada teste para não vazar estado
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category successfully', async () => {
      const dto = { name: 'Eletrônicos' };
      const expectedOutput = { id: 1, ...dto };

      // Simulamos o retorno positivo do Prisma
      mockPrisma.category.create.mockResolvedValue(expectedOutput);

      const result = await service.create(dto);

      expect(result).toEqual(expectedOutput);
      expect(prisma.category.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should throw BadRequestException on prisma error', async () => {
      mockPrisma.category.create.mockRejectedValue(new Error('Prisma Error'));

      await expect(service.create({ name: 'Error' })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      const category = { id: 1, name: 'Games' };
      mockPrisma.category.findUniqueOrThrow.mockResolvedValue(category);

      const result = await service.findOne(1);
      expect(result).toEqual(category);
    });

    it('should throw HttpException (404) when not found', async () => {
      mockPrisma.category.findUniqueOrThrow.mockRejectedValue(
        new Error('Not found'),
      );

      await expect(service.findOne(999)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      mockPrisma.category.delete.mockResolvedValue({ id: 1 });

      const result = await service.remove(1);

      expect(result).toBeUndefined(); // Sua função retorna void (return;)
      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
