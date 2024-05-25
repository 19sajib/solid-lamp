import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDTO {
    @ApiProperty({ type: String, required: true, example: 'hi@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, required: true, example: 'Sajib' })
    fullName: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
        message: "Password must be between 8 and 16 characters long with 1 special character and 1 upper case and lower case character each"
    })
    @ApiProperty({ type: String, required: true, example: 'Hx1234567&' })
    password: string;
}

export class GoogleRegisterDTO {
    @ApiProperty({ type: String, required: true, example: 'hi@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, required: true, example: 'Sajib' })
    fullName: string;

    @ApiProperty({ type: File, example: 'Tech' })
    avatar: string;
}