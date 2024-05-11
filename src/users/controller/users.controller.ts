import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/users.service';
import { SaveUserDTO } from '../dto/UserDTO';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  async save(@Body() data: SaveUserDTO) {
    await this.userService.save(data);
    return 'Usuário salvo com sucesso!';
  }
}
