import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

describe('Testando Controller de usuário', () => {
  let controller: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'User 1', email: 'user1@example.com' },
              { id: 2, name: 'User 2', email: 'user2@example.com' },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um array de usuários', async () => {
    const result = await controller.getAll();

    expect(result).toEqual([
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
    ]);
  });
});
