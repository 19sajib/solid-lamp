import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Job } from './entity/job.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { JobDTO } from './dto/job.dto';
import { Company } from 'src/company/entity/company.entity';
import { paginationAggregate } from 'src/utils/mongodb/pagination';

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
        let aggregateStage = [
            { $match: query },
            { $sort: { createdAt: -1 } },
            { $skip: page === 1 ? 0 : (page - 1) * 10 },
            { $limit: 10 },
            {
              $lookup: {
                from: 'companies',
                localField: 'companyId',
                foreignField: '_id',
                as: 'company',
              },
            },
            {
              $unwind: {
                path: '$company',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 0,
                id: "$_id",
                position: 1,
                workType: 1,
                employmentStatus: 1,
                salaryRange: 1,
                experiencedRequired: 1,
                techStack: 1,
                location: 1,
                createdAt: 1,
                company: {
                  id: '$company._id',
                  name: '$company.name',
                  logo: '$company.logo',
                },
              },
            },
          ]
        return await paginationAggregate(this.jobModel, page, aggregateStage, query)
    }

    // get job by company id
    async getJobByCompanyId(companyId: string): Promise<any> {
        return await this.jobModel.find({ companyId, isShow: true })
    }

    // get job by job id
    async getSingleJobByJobId(jobId: string): Promise<any> {
        return await this.jobModel.findById(jobId).populate({path: "companyId", select: "name logo"})
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
