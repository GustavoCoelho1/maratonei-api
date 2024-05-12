import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { SignInDTO } from '../dto/SignInDTO';
import { AuthService } from '../service/auth.service';
import { AuthResponseDTO } from '../dto/AuthResponseDTO';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async signIn(
        @Body(new ValidationPipe({ transform: true }))
        { email, password }: SignInDTO,
    ): Promise<AuthResponseDTO> {
        return await this.authService.signIn(email, password);
    }
}
