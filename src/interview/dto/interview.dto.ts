import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApplyMethod, InterviewExperience } from "../helper";


export class InterviewDTO {
    @IsMongoId()
    @IsNotEmpty()
    companyId: string

    @IsNotEmpty()
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
    feedback: string

    @ApiProperty({ enum: ApplyMethod, example: ApplyMethod.JOB_PORTAL})
    applyMethod: ApplyMethod

    @ApiProperty({ required: true, enum: InterviewExperience, example: InterviewExperience.POSITIVE })
    @IsBoolean()
    experience: InterviewExperience

    @ApiProperty({ required: true, type: Boolean, example: false })
    @IsBoolean()
    @IsNotEmpty()
    offerReceived: boolean
}