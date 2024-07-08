import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

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

    @ApiProperty({ required: true, type: Number, example: 50000 })
    @IsNumber()
    baseSalary: string

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    stock: boolean

    @ApiProperty({ type: Number, example: 3000 })
    @IsNumber()
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