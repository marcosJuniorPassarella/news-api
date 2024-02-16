import { Categories } from '@prisma/client';

export const categoriesMock: Categories[] = [
  {
    id: '206d8247-d36c-4309-b590-5afc29073571',
    name: 'Notícias',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '51ba8afd-650c-415c-91c9-019751790f9e',
    name: 'Carros Esportivos',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const prismaCategoriesMock = {
  categories: {
    create: jest.fn().mockReturnValue(categoriesMock[0]),
    findMany: jest.fn().mockReturnValue(categoriesMock),
    findFirst: jest.fn().mockReturnValue(categoriesMock[0]),
    update: jest.fn().mockReturnValue(categoriesMock[0]),
    delete: jest.fn(),
  },
};
