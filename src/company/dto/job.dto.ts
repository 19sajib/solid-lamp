import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { EmploymentStatus, WorkType } from "../entity/helper";

export class JobDTO {
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

    @ApiProperty({ type: String, example: "2024-06-26"})
    @IsString()
    @IsOptional()
    applyLastDate: string

}