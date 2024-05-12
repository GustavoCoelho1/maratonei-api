import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
    it('should be defined', () => {
        const jwtService = new JwtService();
        const configService = new ConfigService();

        expect(new AuthGuard(jwtService, configService)).toBeDefined();
    });
});
