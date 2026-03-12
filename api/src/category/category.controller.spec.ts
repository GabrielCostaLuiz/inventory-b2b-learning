/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  // Criamos um objeto que simula o comportamento do Service
  const mockCategoryService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, name: 'Eletrônicos' }]),
    findOne: jest.fn((id) => ({ id, name: 'Eletrônicos' })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(() => undefined), // No Content
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService, // Trocamos o service real pelo mock
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto = { name: 'Nova Categoria' };
      const result = await controller.create(dto);

      expect(result).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, name: 'Eletrônicos' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const id = 1;
      const result = await controller.findOne(id);
      expect(result).toEqual({ id, name: 'Eletrônicos' });
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const id = 1;
      const result = await controller.remove(id);
      expect(result).toBeUndefined(); // Porque é 204 No Content
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
