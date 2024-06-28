import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

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
    hireContract: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hireFullTime: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hirePartTime: boolean

}

class WorkTypeDTO {
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    onSite?: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    remote?: boolean

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    hybrid?: boolean
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
    @IsArray()
    locations: string[]

    @ApiProperty({ type: String, example: "20-30"})
    @IsOptional()
    @IsString()
    numOfEmployees: string

    @ApiProperty({ type: () => [String], example: ["Node", "React", "MongoDB"]})
    @IsOptional()
    @IsArray()
    techStack: string[]

    @ApiProperty({ type: WorkTypeDTO})
    @IsOptional()
    workType: WorkTypeDTO

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

    @ApiProperty({ type: String })
    @IsOptional()
    logo: string

    @ApiProperty({ type: String })
    @IsOptional()
    industry: string

    @ApiProperty({ type: String, example: "Mon-Fri"})
    @IsNotEmpty()
    @IsString()
    workingDays: string

    @ApiProperty({ type: String, example: "9-5"})
    @IsNotEmpty()
    @IsString()
    workingHours: string

    @IsMongoId()
    @IsOptional()
    addedBy: string
}

// export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO){}
export class UpdateCompanyDTO extends OmitType(CreateCompanyDTO, ['addedBy', 'name']){}
// export class UpdateCompanyDTO extends PickType(CreateCompanyDTO, ['description', 'founded', 'headquarter', 'hireType', 'locations', 'numOfEmployees', 'social', 'techStack', 'website', 'workType']){}
