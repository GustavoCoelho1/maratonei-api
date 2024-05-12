import { UserService } from './users.service';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SaveUserDTO } from '../dto/UserDTO';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';

describe('Testando serviços de Usuário', () => {
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(() => {
        userRepository = {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        } as unknown as Repository<UserEntity>;

        userService = new UserService(userRepository);
    });

    it('Deve retornar todos os usuários', async () => {
        const users: UserEntity[] = [
            {
                user_id: uuidv4(),
                name: 'User 1',
                email: 'user1@example.com',
                password: 'password',
            },
            {
                user_id: uuidv4(),
                name: 'User 2',
                email: 'user2@example.com',
                password: 'password',
            },
        ];
        userRepository.find = jest.fn().mockResolvedValue(users);

        const result = await userService.getAll();

        expect(result).toEqual(users);
        expect(userRepository.find).toHaveBeenCalled();
    });

    it('Deve retornar um usuário pelo ID', async () => {
        const userId = uuidv4() as UUID;
        const user: UserEntity = {
            user_id: userId,
            name: 'User 1',
            email: 'user1@example.com',
            password: 'password',
        };
        userRepository.findOne = jest.fn().mockResolvedValue(user);

        const result = await userService.getById(userId);

        expect(result).toEqual(user);
        expect(userRepository.findOne).toHaveBeenCalledWith({
            where: { user_id: userId },
        });
    });

    it('Deve lançar um erro quando o ID é nulo ao buscar usuário por ID', async () => {
        await expect(userService.getById(null)).rejects.toThrowError(
            new HttpException('O ID não pode ser nulo', HttpStatus.BAD_REQUEST),
        );
    });

    it('Deve retornar um usuário pelo email', async () => {
        const userEmail = 'user1@example.com';

        const user: UserEntity = {
            user_id: uuidv4(),
            name: 'User 1',
            email: userEmail,
            password: 'password',
        };

        userRepository.findOne = jest.fn().mockResolvedValue(user);

        const result = await userService.getByEmail(userEmail);

        expect(result).toEqual(user);
        expect(userRepository.findOne).toHaveBeenCalledWith({
            where: { email: userEmail },
        });
    });

    it('Deve lançar um erro quando o email é nulo ao buscar usuário por email', async () => {
        await expect(userService.getByEmail(null)).rejects.toThrow(
            new HttpException(
                'O email não pode ser nulo',
                HttpStatus.BAD_REQUEST,
            ),
        );
    });

    it('Deve salvar um novo usuário', async () => {
        const saveUserDTO: SaveUserDTO = {
            name: 'User 1',
            email: 'user1@example.com',
            password: 'password',
        };

        await userService.save(saveUserDTO);

        expect(userRepository.save).toHaveBeenCalled();
    });

    it('Deve deletar um usuário pelo ID', async () => {
        const userId = uuidv4() as UUID;
        userRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });

        await userService.delete(userId);

        expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('Deve lançar um erro quando o ID é nulo ao deletar usuário', async () => {
        await expect(userService.delete(null)).rejects.toThrow(
            new HttpException('O ID não pode ser nulo', HttpStatus.BAD_REQUEST),
        );
    });

    it('Deve lançar um erro interno do servidor ao deletar um usuário inexistente', async () => {
        const userId = uuidv4() as UUID;
        userRepository.delete = jest.fn().mockResolvedValue({ affected: 0 });

        await expect(userService.delete(userId)).rejects.toThrow(
            new HttpException(
                'Houve um erro ao deletar o usuário',
                HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
    });
});
