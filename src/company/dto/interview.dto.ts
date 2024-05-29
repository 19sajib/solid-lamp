import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class InterviewDTO {
    @ApiProperty({ required: true, type: String, example: "Backend Engineer"})
    @IsString()
    position: string

    @ApiProperty({ required: true, type: String, example: "Did three round of interview"})
    @IsString()
    description: string

    @ApiProperty({ required: true, type: String, example: "Good interview experience"})
    @IsString()
    @IsOptional()
    experience: string
}