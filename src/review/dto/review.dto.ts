import { ApiProperty } from "@nestjs/swagger";
import { EmploymentStatus, EmploymentType } from "../helper";
import { IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class ReviewDTO {
    @IsMongoId()
    @IsOptional()
    companyId: string

    @IsMongoId()
    @IsOptional()
    reviewer: string

    @ApiProperty({ required: true, enum: EmploymentStatus, example: EmploymentStatus.FULL_TIME })
    employmentStatus: EmploymentStatus

    @ApiProperty({ required: true, enum: EmploymentType, example: EmploymentType.FORMER })
    employmentType: EmploymentType

    @ApiProperty({ required: true, type: String, example: "Software Engineer"})
    @IsString()
    position: string

    @ApiProperty({ required: true, type: String, example: "Best For Software Engineer"})
    @IsString()
    reviewTitle: string

    @ApiProperty({ required: true, type: Number, example: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    @ApiProperty({ required: true, type: String })
    @IsString()
    pros: string

    @ApiProperty({ required: true, type: String })
    @IsString()
    cons: string

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    adviceForManagement: string

    @ApiProperty({ type: Boolean })
    recommended: boolean
}