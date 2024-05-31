import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InterviewDTO {
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    companyId: string

    @IsOptional()
    @IsMongoId()
    reviewer: string

    @ApiProperty({ required: true, type: String, example: "Backend Engineer"})
    @IsString()
    position: string

    @ApiProperty({ required: true, type: String, example: "Did three round of interview"})
    @IsString()
    description: string

    @ApiProperty({ type: String, example: "Good interview experience"})
    @IsString()
    @IsOptional()
    experience: string
}