import { AuthService } from './auth.service';
import { UserService } from '@/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('Testando serviços de autorização/autenticação', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;
    let configService: ConfigService;

    beforeEach(() => {
        userService = {
            getByEmail: jest.fn(),
        } as unknown as UserService;

        jwtService = {
            sign: jest.fn(),
        } as unknown as JwtService;

        configService = {
            get: jest.fn(),
        } as unknown as ConfigService;

        authService = new AuthService(userService, jwtService, configService);
    });

    it('Deve retornar um token JWT válido ao fazer login com credenciais corretas', async () => {
        const user = {
            user_id: '123',
            email: 'test@example.com',
            password: 'hashedPassword',
        };

        userService.getByEmail = jest.fn().mockResolvedValue(user);
        jwtService.sign = jest.fn().mockReturnValue('token');
        configService.get = jest.fn().mockReturnValue(3600); // Tempo de expiração em segundos

        const bcryptCompare = jest.fn().mockResolvedValue(true);
        (bcrypt.compare as jest.Mock) = bcryptCompare;

        const result = await authService.signIn('test@example.com', 'password');

        expect(result).toEqual({
            token: 'token',
            expiresIn: 3600,
        });
        expect(userService.getByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compare).toHaveBeenCalledWith(
            'password',
            'hashedPassword',
        );
        expect(jwtService.sign).toHaveBeenCalledWith({
            sub: '123',
            email: 'test@example.com',
        });
        expect(configService.get).toHaveBeenCalledWith('JWT_EXPIRATION_TIME');
    });

    it('Deve lançar um erro de autenticação se a senha for inválida', async () => {
        const user = {
            user_id: '123',
            email: 'test@example.com',
            password: 'hashedPassword',
        };

        userService.getByEmail = jest.fn().mockResolvedValue(user);

        const bcryptCompare = jest
            .fn()
            .mockRejectedValue(
                new HttpException(
                    'Email e/ou senha inválidos!',
                    HttpStatus.UNAUTHORIZED,
                ),
            );
        (bcrypt.compare as jest.Mock) = bcryptCompare;

        await expect(
            authService.signIn('test@example.com', 'password'),
        ).rejects.toThrow(
            new HttpException(
                'Email e/ou senha inválidos!',
                HttpStatus.UNAUTHORIZED,
            ),
        );
    });

    it('Deve lançar um erro interno do servidor se houver um erro ao buscar o tempo de expiração do JWT', async () => {
        const user = {
            user_id: '123',
            email: 'test@example.com',
            password: 'hashedPassword',
        };

        userService.getByEmail = jest.fn().mockResolvedValue(user);

        const bcryptCompare = jest.fn().mockResolvedValue(true);
        (bcrypt.compare as jest.Mock) = bcryptCompare;

        configService.get = jest.fn().mockReturnValue(null);

        await expect(
            authService.signIn('test@example.com', 'password'),
        ).rejects.toThrow(
            new HttpException(
                'Houve um erro ao tentar fazer login!',
                HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
    });
});
