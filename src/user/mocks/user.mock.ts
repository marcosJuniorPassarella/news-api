import { Users } from '@prisma/client';

export const userMock: Users[] = [
  {
    id: '4738ba87-8874-4500-bd16-c0160348ddd1',
    name: 'Teste',
    email: 'teste@teste.com',
    password: '$2b$10$KWw1FO8pLE.ZAjf5aKWuMe.ZpuwFO3ThmEPb9xVf.HkshVq.nu5Pi',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '551e8656-f062-4e79-a7a8-c1fb55f4667c',
    name: 'Marcos',
    email: 'marcos@teste123.com',
    password: '$2b$10$Mg5aMewIiY9wqXrEqdJf1eYjNrCuvp4U0DdhvOsJP3hPgt65.OpEC',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const prismaUserMock = {
  users: {
    create: jest.fn().mockReturnValue(userMock[0]),
    findMany: jest.fn().mockResolvedValue(userMock),
    findFirst: jest.fn().mockResolvedValue(userMock[0]),
    update: jest.fn().mockResolvedValue(userMock[0]),
    delete: jest.fn(),
  },
};
