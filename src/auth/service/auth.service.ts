import { UserService } from '@/users/service/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/database/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    signIn = async (email: string, password: string) => {
        let user = await this.userService.getByEmail(email).catch((err) => {
            throw new HttpException(
                'Email e/ou senha inválidos!',
                HttpStatus.UNAUTHORIZED,
            );
        });

        const validPassword = await compare(password, user.password);

        if (!validPassword) {
            //Se a senha não for igual ao do usuário no banco de dados
            throw new HttpException(
                'Email e/ou senha inválidos!',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const expiresInDotEnv = this.configService.get<number>(
            'JWT_EXPIRATION_TIME',
        );

        if (!expiresInDotEnv) {
            throw new HttpException(
                'Houve um erro ao tentar fazer login!',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const expiresIn = Number(expiresInDotEnv);

        const jwtPayload = {
            sub: user.user_id,
            email: user.email,
        };

        const token = this.jwtService.sign(jwtPayload);

        return { token, expiresIn };
    };
}
