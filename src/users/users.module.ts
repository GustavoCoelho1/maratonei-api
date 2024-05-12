import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
    controllers: [UsersController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UserService], //Quando importamos este módulo de Usuário em qualquer outro módulo, teremos acesso também aos serviços
    providers: [UserService],
})
export class UsersModule {}
