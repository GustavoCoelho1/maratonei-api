import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModuleConfig: TypeOrmModule = {
  useFactory: async (configService: ConfigService) => ({
    // Usa o ConfigService para obter as configurações do banco de dados
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/entities/**'],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
  }),
  // Injeta ConfigService
  inject: [ConfigService],
};

describe('Testando banco de dados', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        // Substitui TypeOrmModule.forRootAsync pelo mock
        TypeOrmModule.forRootAsync(typeOrmModuleConfig),
      ],
    }).compile();
  });

  it('Deve realizar conexão com o banco de dados (compilar o módulo TypeORM)', () => {
    // Verifica se o módulo foi inicializado corretamente
    expect(module).toBeDefined();

    // Obtém a instância do módulo do banco de dados
    const databaseModule = module.get(DatabaseModule);
    expect(databaseModule).toBeDefined();
  });
});
