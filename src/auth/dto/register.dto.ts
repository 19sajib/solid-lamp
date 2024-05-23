import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RegisterDTO {
    @ApiProperty({ type: String, required: true, example: 'hi@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, required: true, example: 'Sajib' })
    fullName: string;

    @ApiProperty({ type: String, required: true, example: '12345678'})
    password: string;
}

export class GoogleRegisterDTO {
    @ApiProperty({ type: String, required: true, example: 'hi@gmail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, required: true, example: 'Sajib' })
    fullName: string;

    @ApiProperty({ type: String, required: true, example: '12345678'})
    password: string;

    @ApiProperty({ type: File,  example: 'Tech'})
    avatar: string;
}