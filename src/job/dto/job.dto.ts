import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmploymentStatus, WorkType } from "../helper";

export class JobDTO {
    @IsMongoId()
    @IsOptional()
    companyId: string

    @IsMongoId()
    @IsOptional()
    addedBy: string

    @ApiProperty({ type: String, example: "Full Stack Developer", required: true })
    @IsString()
    @IsNotEmpty()
    position: string

    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({ enum: EmploymentStatus, example: EmploymentStatus.FULL_TIME, required: true})
    @IsString()
    @IsNotEmpty()
    employmentStatus: EmploymentStatus

    @ApiProperty({ enum: WorkType, example: WorkType.HYBRID, required: true })
    @IsString()
    @IsNotEmpty()
    workType: WorkType

    @ApiProperty({ type: String, example: "Sun-Thu"})
    @IsNotEmpty()
    @IsString()
    workDays: string

    @ApiProperty({ type: String, example: "9-5"})
    @IsNotEmpty()
    @IsString()
    workingHours: string

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

    @ApiProperty({ required: true, type: String, example: "Fresher"})
    @IsString()
    @IsNotEmpty()
    experiencedRequired: string

    @ApiProperty({ required: true, type: () => [String], example: ["Node", "MongoDB"]})
    @IsArray()
    @IsNotEmpty()
    techStack: string[]

}