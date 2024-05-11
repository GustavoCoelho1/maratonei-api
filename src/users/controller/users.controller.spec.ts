import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from '../service/users.service';

const usersDataMock = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
];

const MockedUserService = {
    provide: UserService,
    useValue: {
        getAll: jest.fn().mockResolvedValue(usersDataMock),
        save: jest.fn(),
    },
};

describe('Testando Controller de usuário', () => {
    let controller: UsersController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        userService = module.get<UserService>(UserService);
    });

    it('Deve ser definido', () => {
        expect(controller).toBeDefined();
    });

    it('getAll() deve retornar um array de usuários', async () => {
        const result = await controller.getAll();

        expect(result).toEqual(usersDataMock);
    });

    it('save() deve retornar mesnagem de sucesso', async () => {
        const userMock = {
            user_id: 'ec95d9-cdb8-4775-8560-31a19d5938da',
            name: 'testUser',
            email: 'teste@user.com',
            password: '123',
        };

        const result = await controller.save(userMock);

        expect(result).toEqual('Usuário salvo com sucesso!');
    });
});
