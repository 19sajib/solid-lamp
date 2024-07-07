import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";

export class SalaryDTO {
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
    baseSalary: string

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    stock: string

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    additional: string

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    performanceBonus: boolean

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    profitSharing: boolean

    @ApiProperty({ type: String })
    @IsOptional()
    @IsString()
    experience: string
}