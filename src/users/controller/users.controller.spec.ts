import { UsersController } from './users.controller';
import { UserService } from '../service/users.service';
import { SaveUserDTO } from '../dto/UserDTO';

describe('Testando controladores de Usuário', () => {
    let usersController: UsersController;
    let userService: UserService;

    beforeEach(() => {
        userService = {
            getAll: jest.fn(),
            getById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        } as unknown as UserService;

        usersController = new UsersController(userService);
    });

    it('Deve ser definido', () => {
        expect(usersController).toBeDefined();
    });

    describe('getAll', () => {
        it('Deve retornar todos os usuários', async () => {
            const users = [
                {
                    user_id: '0cd022c9-6a5f-4a16-a86a-690b62ce2215',
                    name: 'User 1',
                    email: 'hi@email.com',
                    password:
                        '$2a$12$zxx8mY/Dxj2bFSKj4C9m9eN9f569c8O8qL6i1Rbt5sID99yF9tQOa',
                },
                {
                    user_id: '0cd022c9-6a5f-4a16-a86a-690b62ce2219',
                    name: 'User 2',
                    email: 'hi2@email.com',
                    password:
                        '$2a$12$zxx8mY/Dxj2bFSKj4C9m9eN9f569c8O8qL6i1Rbt5sID99yF9tQOa',
                },
            ];
            userService.getAll = jest.fn().mockResolvedValue(users);

            const result = await usersController.getAll();

            expect(result).toEqual(users);
        });
    });

    describe('getById', () => {
        it('Deve retornar um usuário pelo ID', async () => {
            const user = {
                user_id: '0cd022c9-6a5f-4a16-a86a-690b62ce2215',
                name: 'User 1',
                email: 'hi@email.com',
                password:
                    '$2a$12$zxx8mY/Dxj2bFSKj4C9m9eN9f569c8O8qL6i1Rbt5sID99yF9tQOa',
            };
            userService.getById = jest.fn().mockResolvedValue(user);

            const result = await usersController.getById(
                '0cd022c9-6a5f-4a16-a86a-690b62ce2215',
            );

            expect(result).toEqual(user);
        });
    });

    describe('save', () => {
        it('Deve salvar um novo usuário', async () => {
            const userData: SaveUserDTO = {
                name: 'User 1',
                email: 'user1@example.com',
                password: 'password',
            };
            userService.save = jest.fn();

            const result = await usersController.save(userData);

            expect(result).toEqual('Usuário salvo com sucesso!');
            expect(userService.save).toHaveBeenCalledWith(userData);
        });
    });

    describe('delete', () => {
        it('Deve excluir um usuário pelo ID', async () => {
            userService.delete = jest.fn();

            const result = await usersController.delete(
                '0cd022c9-6a5f-4a16-a86a-690b62ce2215',
            );

            expect(result).toEqual('Usuário excluído com sucesso!');
            expect(userService.delete).toHaveBeenCalledWith(
                '0cd022c9-6a5f-4a16-a86a-690b62ce2215',
            );
        });
    });
});
