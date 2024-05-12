import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { SaveUserDTO } from '../dto/UserDTO';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    getAll = async () => await this.userRepository.find();

    getById = async (id: UUID) => {
        if (id == null) {
            throw new HttpException(
                'O ID não pode ser nulo',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });

        if (!user) {
            throw new HttpException(
                'Não foi possível encontrar usuário com o ID informado!',
                HttpStatus.NOT_FOUND,
            );
        }

        return user;
    };

    getByEmail = async (email: string) => {
        if (email == null) {
            throw new HttpException(
                'O email não pode ser nulo',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new HttpException(
                'Não foi possível encontrar usuário com o email informado!',
                HttpStatus.NOT_FOUND,
            );
        }

        return user;
    };

    save = async ({ email, name, password }: SaveUserDTO) => {
        const encryptedPassword = await hash(password, 10);

        const newUser = {
            email,
            name,
            password: encryptedPassword,
        };

        await this.userRepository.save(newUser);
    };

    delete = async (id: UUID) => {
        if (id == null) {
            throw new HttpException(
                'O ID não pode ser nulo',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.delete(id);

        if (!user || user.affected === 0) {
            throw new HttpException(
                'Houve um erro ao deletar o usuário',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    };
}
