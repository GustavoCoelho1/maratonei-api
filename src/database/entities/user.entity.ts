import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteEntity } from './favorite.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    password: string;

    @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
    favorites: FavoriteEntity[];
}
