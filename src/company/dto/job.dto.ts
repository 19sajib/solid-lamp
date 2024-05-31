import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmploymentStatus, WorkType } from "../entity/helper";

export class JobDTO {
    @ApiProperty({ type: String })
    @IsMongoId()
    @IsOptional()
    companyId: string

    @IsMongoId()
    @IsOptional()
    addedBy: string

    @ApiProperty({ type: String, example: "Full Stack Developer", required: true })
    @IsString()
    position: string

    @ApiProperty({ type: String, required: true })
    @IsString()
    description: string

    @ApiProperty({ enum: EmploymentStatus, example: EmploymentStatus.FULL_TIME, required: true})
    employmentStatus: EmploymentStatus

    @ApiProperty({ enum: WorkType, example: WorkType.HYBRID, required: true })
    workType: WorkType

    @ApiProperty({ type: String, example: "London"})
    @IsString()
    @IsOptional()
    location: string

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    applyLink: string

    @ApiProperty({ type: Date, example: new Date()})
    @IsString()
    @IsNotEmpty()
    applyLastDate: string

    @ApiProperty({ type: String, required: true, example: "50k-80k"})
    @IsString()
    @IsNotEmpty()
    salaryRange: string

}