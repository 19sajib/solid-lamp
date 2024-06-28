import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Job } from './entity/job.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { JobDTO } from './dto/job.dto';
import { Company } from 'src/company/entity/company.entity';
import { pagination } from 'src/utils/mongodb/pagination';

@Injectable()
export class JobService {
    constructor(
        @InjectModel(Job) private readonly jobModel: ReturnModelType<typeof Job>,
        @InjectModel(Company) private readonly companyModel: ReturnModelType<typeof Company>
    ) {}

    // get paginated job list with filtering
    async getPaginatedJobList(page: number, position: string, workType: string, techStack: string, location: string): Promise<any> {
        let query = {}
        if (position) query = {...query, position: {
            $regex: position,
            $options: "i"
        }}
        if (workType) query = {...query, workType: {
            $regex: workType,
            $options: "i"
        }}
        if (techStack) {
            query = {...query, techStack: {
                $regex: techStack,
                $options: "i"
            }}
        }
        if (location) query = {
            ...query,
            location: {
                $regex: location,
                $options: "i"
            }
        }
        query = { ...query, isShow: true }
        return await pagination(this.jobModel, page, query)
    }

    // get job by company id
    async getJobByCompanyId(companyId: string): Promise<any> {
        return await this.jobModel.find({ companyId, isShow: true })
    }
    
    // add job to company
    async addJob(body: JobDTO): Promise<any> {
        const { companyId } = body
        const job = await this.jobModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {jobs: job.id} }, { new: true, useFindAndModify: true })
        return job
    }


    // ===>> Admin Actions <<===

    // archive job by job id
    async archiveJob(jobId: string): Promise<any> {
        return await this.jobModel.findByIdAndUpdate(jobId, { $set: { isShow: false }}, { new: true })
    }

}
