import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";

export class SalaryDTO {
    @ApiProperty({ type: String })
    @IsMongoId()
    @IsOptional()
    companyId: string

    @IsMongoId()
    @IsOptional()
    reviewer: string

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