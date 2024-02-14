import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaUserMock, userMock } from './mocks/user.mock';

describe('TestService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaUserMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  // limpar os mocks apos a execução de cada teste
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`${UserService.prototype.create.name}() should create a new user`, async () => {
    const response = await service.create(userMock[0]);

    expect(response).toEqual(userMock[0]);
    expect(prismaService.users.create).toHaveBeenCalledTimes(1);
  });

  it(`${UserService.prototype.findByEmail.name}() should return a single user`, async () => {
    const response = await service.findByEmail(userMock[0].email);

    expect(response).toEqual(userMock[0]);
    expect(prismaService.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.users.findFirst).toHaveBeenCalledWith({
      where: { email: userMock[0].email },
    });
  });

  it(`${UserService.prototype.findByEmail.name}() should return null when user is not found`, async () => {
    jest.spyOn(prismaService.users, 'findFirst').mockResolvedValueOnce(null);
    const response = await service.findByEmail('fake@fake.com');

    expect(response).toEqual(null);
    expect(prismaService.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.users.findFirst).toHaveBeenCalledWith({
      where: { email: 'fake@fake.com' },
    });
  });

  it(`${UserService.prototype.findById.name}() should return a single user`, async () => {
    const response = await service.findById(userMock[0].id);

    expect(response).toEqual(userMock[0]);
    expect(prismaService.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.users.findFirst).toHaveBeenCalledWith({
      where: { id: userMock[0].id },
    });
  });

  it(`${UserService.prototype.findById.name}() should return null when user is not found`, async () => {
    jest.spyOn(prismaService.users, 'findFirst').mockResolvedValueOnce(null);
    const response = await service.findById('123');

    expect(response).toEqual(null);
    expect(prismaService.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prismaService.users.findFirst).toHaveBeenCalledWith({
      where: { id: '123' },
    });
  });

  it(`${UserService.prototype.update.name}() should update user`, async () => {
    const response = await service.update({
      id: userMock[0].id,
      data: userMock[0],
    });

    expect(response).toEqual(userMock[0]);
    expect(prismaService.users.update).toHaveBeenCalledTimes(1);
    expect(prismaService.users.update).toHaveBeenCalledWith({
      where: { id: userMock[0].id },
      data: { name: userMock[0].name, email: userMock[0].email },
    });
  });

  it(`${UserService.prototype.update.name}() should return null when user is not found`, async () => {
    jest.spyOn(prismaService.users, 'update').mockResolvedValueOnce(null);

    const response = await service.update({
      id: '123',
      data: userMock[0],
    });

    expect(response).toEqual(null);
    expect(prismaService.users.update).toHaveBeenCalledTimes(1);
    expect(prismaService.users.update).toHaveBeenCalledWith({
      where: { id: '123' },
      data: { name: userMock[0].name, email: userMock[0].email },
    });
  });
});
