import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/users.service';
import { SaveUserDTO } from '../dto/UserDTO';
import { UUID } from 'crypto';
import { AuthGuard } from '@/auth/guard/auth.guard';

@UseGuards(AuthGuard) //Define o Guard para validar se o usuário está autenticado em todas os endpoints desse controller
@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: UUID) {
        return await this.userService.getById(id);
    }

    @Post()
    async save(
        @Body(new ValidationPipe({ transform: true })) data: SaveUserDTO,
    ) {
        await this.userService.save(data);
        return 'Usuário salvo com sucesso!';
    }

    @Delete('/:id')
    async delete(@Param('id') id: UUID) {
        await this.userService.delete(id);
        return 'Usuário excluído com sucesso!';
    }
}
