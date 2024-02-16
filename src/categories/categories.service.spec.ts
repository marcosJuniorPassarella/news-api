import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesService } from './categories.service';
import { categoriesMock, prismaCategoriesMock } from './mocks/categories.mock';

describe(`${CategoriesService.name}`, () => {
  let service: CategoriesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: prismaCategoriesMock },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`${CategoriesService.prototype.create.name}() should create a new category`, async () => {
    const response = await service.create(categoriesMock[0]);

    expect(response).toEqual(categoriesMock[0]);
    expect(prismaService.categories.create).toHaveBeenCalledTimes(1);
  });

  it(`${CategoriesService.prototype.findByName.name}() should return a single category`, async () => {
    const response = await service.findByName(categoriesMock[0].name);

    expect(response).toEqual(categoriesMock[0]);
    expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
      where: { name: categoriesMock[0].name },
    });
  });

  it(`${CategoriesService.prototype.findByName.name}() should return null when category is not found`, async () => {
    jest
      .spyOn(prismaService.categories, 'findFirst')
      .mockResolvedValueOnce(null);
    const response = await service.findByName('fakeName');

    expect(response).toEqual(null);
    expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
      where: { name: 'fakeName' },
    });
  });

  it(`${CategoriesService.prototype.findAll.name}() should return all categories`, async () => {
    const response = await service.findAll();

    expect(response).toEqual(categoriesMock);
    expect(prismaService.categories.findMany).toHaveBeenCalledTimes(1);
  });

  it(`${CategoriesService.prototype.findById.name}() should return a single category`, async () => {
    const response = await service.findById(categoriesMock[0].id);

    expect(response).toEqual(categoriesMock[0]);
    expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
      where: { id: categoriesMock[0].id },
    });
  });

  it(`${CategoriesService.prototype.findById.name}() should return null when category is not found`, async () => {
    jest
      .spyOn(prismaService.categories, 'findFirst')
      .mockResolvedValueOnce(null);
    const response = await service.findById('123');

    expect(response).toEqual(null);
    expect(prismaService.categories.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.findFirst).toHaveBeenCalledWith({
      where: { id: '123' },
    });
  });

  it(`${CategoriesService.prototype.update.name}() should update category`, async () => {
    jest
      .spyOn(prismaService.categories, 'update')
      .mockResolvedValueOnce(categoriesMock[1]);
    const response = await service.update({
      id: categoriesMock[0].id,
      data: categoriesMock[1],
    });

    expect(response.name).toEqual(categoriesMock[1].name);
    expect(prismaService.categories.update).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.update).toHaveBeenCalledWith({
      where: { id: categoriesMock[0].id },
      data: categoriesMock[1],
    });
  });

  it(`${CategoriesService.prototype.update.name}() should return null when category is not found`, async () => {
    jest.spyOn(prismaService.categories, 'update').mockResolvedValueOnce(null);
    const response = await service.update({
      id: '123',
      data: categoriesMock[0],
    });

    expect(response).toEqual(null);
    expect(prismaService.categories.update).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.update).toHaveBeenCalledWith({
      where: { id: '123' },
      data: categoriesMock[0],
    });
  });

  it(`${CategoriesService.prototype.update.name}() should delete category`, async () => {
    jest.spyOn(prismaService.categories, 'delete').mockResolvedValueOnce(null);
    const response = await service.delete(categoriesMock[0].id);

    expect(response).toEqual(null);
    expect(prismaService.categories.delete).toHaveBeenCalledTimes(1);
    expect(prismaService.categories.delete).toHaveBeenCalledWith({
      where: { id: categoriesMock[0].id },
    });
  });
});
