import { IsEmail, IsNotEmpty } from 'class-validator';

export class SaveUserDTO {
    @IsNotEmpty({ message: 'Nome de usuário não pode ser nulo!' })
    name: string;
    @IsNotEmpty({ message: 'Senha não pode ser nulo!' })
    password: string;
    @IsEmail({}, { message: 'E-mail inválido!' })
    @IsNotEmpty({ message: 'E-mail não pode ser nulo!' })
    email: string;
}
