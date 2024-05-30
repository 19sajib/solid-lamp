import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Company } from './entity/company.entity';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCompanyDTO } from './dto/company.dto';
import { InterviewDTO } from './dto/interview.dto';
import { Interview } from './entity/interview.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company) private readonly companyModel: ReturnModelType<typeof Company>,
        @InjectModel(Interview) private readonly interviewModel: ReturnModelType<typeof Interview>
    ){ }

    // create company profile
    async createCompany(body: CreateCompanyDTO): Promise<any> {
        const { name, website } = body

        let existingCompany;
        existingCompany = await this.companyModel.findOne({ 
                                    $or: [{ name }, { website }] 
                                }).collation({ locale: 'en', strength: 2 });
        if(existingCompany) throw new HttpException("This company already listed", HttpStatus.BAD_REQUEST)
        
        const company = await this.companyModel.create(body)
        return company
        
    }

    // add interview to company
    async addInterview(body: InterviewDTO): Promise<any> {
        const { companyId } =body
        const interview = await this.interviewModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {interviews: interview.id} }, { new: true, useFindAndModify: true })
        return interview
    }
}
