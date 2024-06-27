import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";
import { SubsidiesEnum } from "../helper";

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
    salary: string

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
    ta_da: boolean

    @ApiProperty({ enum: () => SubsidiesEnum , example: SubsidiesEnum.PARTIAL })
    @IsString()
    @IsOptional()
    lunch: SubsidiesEnum

    @ApiProperty({ enum: () => SubsidiesEnum , example: SubsidiesEnum.PARTIAL })
    @IsString()
    @IsOptional()
    breakfast: SubsidiesEnum

    @ApiProperty({ type: String })
    @IsOptional()
    @IsString()
    experience: string
}