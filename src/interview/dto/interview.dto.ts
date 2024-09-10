import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { ApplyMethod, Difficulty, InterviewExperience, Offer } from "../helper";


class QuestionsDTO {
    @IsString()
    @IsNotEmpty()
    question: string

    @IsString()
    @IsOptional()
    answer: string
}

export class InterviewDTO {
    @IsMongoId()
    @IsOptional()
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

    @ApiProperty({ required: true, type: () => [QuestionsDTO], example: [{"question":"DFS, BFS and Graph related questions", "answer": "hola"}]})
    @IsNotEmpty()
    @IsArray()
    questions: QuestionsDTO[]
    
    @ApiProperty({ enum: ApplyMethod, example: ApplyMethod.JOB_PORTAL})
    @IsString()
    applyMethod: ApplyMethod
    
    @ApiProperty({ required: true, enum: InterviewExperience, example: InterviewExperience.POSITIVE })
    @IsString()
    experience: InterviewExperience

    @ApiProperty({ required: true, enum: Offer, example: Offer.Yes_And_Accepted_Offer})
    @IsString()
    offer: string

    @ApiProperty({ required: true, enum: Difficulty, example: Difficulty.Average})
    @IsString()
    difficulty: string
    
    // @ApiProperty({ required: true, type: Boolean, example: false })
    // @IsBoolean()
    // @IsNotEmpty()
    // offerReceived: boolean
    
    // @ValidateIf(dto => dto.offerReceived == true)
    // // @ApiProperty({ required: false, type: Boolean, example: true })
    // @IsBoolean()
    // @IsNotEmpty()
    // offerAccepted: boolean

    @ApiProperty({ type: String, example: "Good interview experience"})
    @IsString()
    @IsOptional()
    feedback: string
}