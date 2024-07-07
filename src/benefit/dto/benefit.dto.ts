import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BenefitDTO {
    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    careerGrowth: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    healthcareBenefits: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    wellnessBenefits: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    paidSickLeave: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    birthdaySalary: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    occasionalGift: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    breakfast: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    lunch: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    snacks: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    paidVacation: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    paidLeave: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    workFromHome: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    flexibleHours: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    maternityPaternityLeave: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    transportAllowance: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    cellPhoneAllowance: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    providentFund: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    performanceBonus: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    professionalTraining: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    stockOption: boolean

    @ApiProperty({ required: false, type: Boolean, default: false })
    @IsOptional()
    @IsBoolean()
    culturalSocialEvent: boolean
}

export class BenefitReviewDTO {
    @ApiProperty({ type: BenefitDTO})
    @IsOptional()
    benefit: BenefitDTO

    @ApiProperty({ required: true, type: String, default: "really good experience"})
    @IsString()
    @IsNotEmpty()
    description: string

    @IsMongoId()
    @IsOptional()
    companyId: string

    @IsMongoId()
    @IsOptional()
    reviewer: string
}