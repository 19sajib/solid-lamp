import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginDTO {
    @ApiProperty({ type: String, required: true, example: 'hi@gmail.com'})
    @IsEmail()
    email: string

    @ApiProperty({ type: String, required: true, example: '12345678' })
    password: string
}

export class GoogleLoginDTO {
    @ApiProperty({ type: String, required: true, example: 'hi@gmail.com'})
    @IsEmail()
    email: string
}