import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Interview } from './entity/interview.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { InterviewDTO } from './dto/interview.dto';
import { Company } from 'src/company/entity/company.entity';

@Injectable()
export class InterviewService {
    constructor(
        @InjectModel(Interview) private readonly interviewModel: ReturnModelType<typeof Interview>,
        @InjectModel(Company) private readonly companyModel: ReturnModelType<typeof Company>
    ) {}

    async getInterviewList(companyId: string): Promise<any> {
        return await this.interviewModel.find({companyId, isShow: true})
    }

    // add interview to company
    async addInterview(body: InterviewDTO): Promise<any> {
        const { companyId } = body
        const company = await this.companyModel.findById(companyId)
        if(!company) throw new HttpException("No company found", HttpStatus.NOT_FOUND)

        const interview = await this.interviewModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {interviews: interview.id} }, { new: true, useFindAndModify: true })
        return interview
    }

    // archive interview
    async archiveInterview(interviewId: string): Promise<any> {
        const interview = await this.interviewModel.findById(interviewId)
        if(!interview) throw new HttpException("No Interview Found...", HttpStatus.NOT_FOUND)
        
        return this.interviewModel.findByIdAndUpdate(interviewId, { $set: {isShow: false} }, { new: true })
    }
}
