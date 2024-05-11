import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { SaveUserDTO } from '../dto/UserDTO';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    getAll = async () => await this.userRepository.find();

    getById = async (id: UUID) =>
        await this.userRepository.findOne({ where: { user_id: id } });

    save = async (data: SaveUserDTO) => {
        console.log(data);
    };
}
