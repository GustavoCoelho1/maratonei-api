import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), //Declarando { isGlobal: true } faz com que seja acessível em todos os módulos da aplicação
        UsersModule,
        DatabaseModule,
        AuthModule,
        MoviesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
