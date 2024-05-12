import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDTO {
    @IsEmail({}, { message: 'E-mail inválido!' })
    email: string;
    @IsNotEmpty({ message: 'Senha não pode ser nula' })
    password: string;
}
