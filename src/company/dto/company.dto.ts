import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Matches } from "class-validator";
import { WorkType } from "../entity/helper";

class HireTypeDTO {
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hireFresher: boolean
    
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hireIntern: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hireContractor: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hireFullTime: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hirePartTime: boolean

}

class SocialDTO {
    @ApiProperty({ type : String })
    @IsOptional()
    @Matches(/^https?:\/\/(www\.)?linkedin\.com\/.*$/)
    linkedin?: string;
  
    @ApiProperty({ type: String })
    @IsOptional()
    @Matches(/^https?:\/\/(www\.)?twitter\.com\/.*$/)
    twitter?: string;
  
    @ApiProperty({ type: String })
    @IsOptional()
    @Matches(/^https?:\/\/(www\.)?facebook\.com\/.*$/)
    facebook?: string;
  
    @ApiProperty({ type: String })
    @IsOptional()
    @Matches(/^https?:\/\/(www\.)?instagram\.com\/.*$/)
    instagram?: string;
}

export class CreateCompanyDTO {
    @ApiProperty({ required: true, type: String, example: "Hash Lab Ltd"})
    @IsString()
    name: string

    @ApiProperty({ type: String, example: "Blah Blah Blah..."})
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty({ type: String, example: "2019"})
    @IsOptional()
    @IsString()
    founded: string

    @ApiProperty({ type: String, example: "London"})
    @IsOptional()
    @IsString()
    headquarter: string

    @ApiProperty({ type: () => [String], example: ["London", "Sydney"]})
    @IsOptional()
    @IsString()
    locations: [string]

    @ApiProperty({ type: String, example: "20-30"})
    @IsOptional()
    @IsString()
    numOfEmployees: string

    @ApiProperty({ type: () => [String], example: ["Node", "React", "MongoDB"]})
    @IsOptional()
    @IsString()
    techStack: [string]

    @ApiProperty({ enum: WorkType, example: WorkType.HYBRID})
    @IsOptional()
    @IsString()
    workType: WorkType

    @ApiProperty({ type: String, example: "www.hash-lab.com"})
    @IsOptional()
    @IsString()
    website: string

    @ApiProperty({ type: HireTypeDTO })
    @IsOptional()
    hireType: HireTypeDTO

    @ApiProperty({ type: SocialDTO })
    @IsOptional()
    social: SocialDTO
}
