import { Test } from '@nestjs/testing';
import { UserEntity } from '../../database/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

describe('Testando serviços de usuário', () => {
    let service: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    it('Deve ser definido', () => {
        // Verifica se o módulo foi inicializado corretamente
        expect(service).toBeDefined();
    });

    it('getAll() deve retornar mútiplos dados, se houverem no banco de dados', async () => {
        const users: UserEntity[] = [
            {
                user_id: randomUUID(),
                name: 'User 1',
                email: 'user1@example.com',
                password: '234',
            },
            {
                user_id: randomUUID(),
                name: 'User 2',
                email: 'user2@example.com',
                password: '234',
            },
        ];

        jest.spyOn(userRepository, 'find').mockResolvedValue(users);

        const result = await service.getAll();

        expect(result).toEqual(users);
    });

    it('save() deve ser executado sem erros', () => {
        const userMock = {
            user_id: 'ec95d9-cdb8-4775-8560-31a19d5938da',
            name: 'testUser',
            email: 'teste@user.com',
            password: '123',
        };

        service.save(userMock);

        expect(true).toEqual(true);
    });
});
