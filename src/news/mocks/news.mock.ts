import { News } from '@prisma/client';

export const newsMock: News[] = [
  {
    id: 'affbf2c3-82d6-460e-ac5d-757ea56993bf',
    title: 'Teste edição de notícia',
    content: 'Teste edição de conteúdo',
    publication_date: new Date(),
    author_id: '551e8656-f062-4e79-a7a8-c1fb55f4667c',
    category_id: '51ba8afd-650c-415c-91c9-019751790f9e',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'sgdfgdfgdfgfdgfdgfdgdgfdgdgfd',
    title: 'Teste edição de notícia 2',
    content: 'Teste edição de conteúdo 2',
    publication_date: new Date(),
    author_id: '551e8656-f062-4e79-a7a8-c1fb55f4667c',
    category_id: '51ba8afd-650c-415c-91c9-019751790f9e',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const prismaNewsMock = {
  news: {
    create: jest.fn().mockReturnValue(newsMock[0]),
    findMany: jest.fn().mockReturnValue(newsMock),
    findFirst: jest.fn().mockReturnValue(newsMock[0]),
    update: jest.fn().mockReturnValue(newsMock[0]),
    delete: jest.fn(),
  },
};
