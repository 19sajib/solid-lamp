import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SalaryDTO {
    @ApiProperty({ required: true, type: String, example: "Software Engineer"})
    @IsString()
    position: string

    @ApiProperty({ required: true, type: String })
    @IsString()
    salary: string

    @ApiProperty({ type: String })
    @IsOptional()
    @IsString()
    experience: string
}