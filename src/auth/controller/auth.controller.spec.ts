import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { SignInDTO } from '../dto/SignInDTO';
import { AuthResponseDTO } from '../dto/AuthResponseDTO';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('Testando controladores de autorização/autenticação', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(() => {
        authService = {
            signIn: jest.fn(),
        } as unknown as AuthService;

        authController = new AuthController(authService);
    });

    it('Deve ser definido', () => {
        expect(authController).toBeDefined();
    });

    describe('signIn', () => {
        it('Deve retornar um token JWT ao fazer login com credenciais corretas', async () => {
            const signInDTO: SignInDTO = {
                email: 'test@example.com',
                password: 'password',
            };
            const authResponseDTO: AuthResponseDTO = {
                token: 'token',
                expiresIn: 3600,
            };

            authService.signIn = jest.fn().mockResolvedValue(authResponseDTO);

            const result = await authController.signIn(signInDTO);

            expect(result).toEqual(authResponseDTO);
            expect(authService.signIn).toHaveBeenCalledWith(
                'test@example.com',
                'password',
            );
        });

        it('Deve lançar um erro de autenticação se as credenciais forem inválidas', async () => {
            const signInDTO: SignInDTO = {
                email: 'test@example.com',
                password: 'password',
            };

            authService.signIn = jest
                .fn()
                .mockRejectedValue(
                    new HttpException(
                        'Email e/ou senha inválidos!',
                        HttpStatus.UNAUTHORIZED,
                    ),
                );

            await expect(authController.signIn(signInDTO)).rejects.toThrowError(
                new HttpException(
                    'Email e/ou senha inválidos!',
                    HttpStatus.UNAUTHORIZED,
                ),
            );
        });
    });
});
