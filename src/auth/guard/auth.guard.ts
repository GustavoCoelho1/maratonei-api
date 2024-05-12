import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    jwtSecret: string;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        this.jwtSecret = this.configService.get('JWT_SECRET');
    }

    private unauthorizedError(): HttpException {
        return new HttpException(
            'Usuário não autenticado',
            HttpStatus.UNAUTHORIZED,
        );
    }

    //Guard funciona como um middleware que pode interceptar qualquer requisição feita à aplicação
    private getTokenFromHeader(request: Request) {
        const {
            headers: { authorization },
        } = request;

        if (!authorization) {
            throw this.unauthorizedError();
        }

        const [type, token] = authorization.split(' ');

        if (type !== 'Bearer' || !token) {
            throw this.unauthorizedError();
        }

        return token;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); //Pegando a requisição que está sendo feita

        const token = this.getTokenFromHeader(request);

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.jwtSecret,
            });

            request['user'] = payload;
        } catch (err) {
            console.log(err);
            throw this.unauthorizedError();
        }

        return true;
    }
}
