import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Company } from './entity/company.entity';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCompanyDTO, UpdateCompanyDTO } from './dto/company.dto';
import { InterviewDTO } from './dto/interview.dto';
import { Interview } from './entity/interview.entity';
import { ReviewDTO } from './dto/review.dto';
import { Review } from './entity/review.entity';
import { SalaryDTO } from './dto/salary.dto';
import { Salary } from './entity/salary.entity';
import { JobDTO } from './dto/job.dto';
import { Job } from './entity/job.entity';
import { pagination } from 'src/utils/mongodb/pagination';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company) private readonly companyModel: ReturnModelType<typeof Company>,
        @InjectModel(Interview) private readonly interviewModel: ReturnModelType<typeof Interview>,
        @InjectModel(Review) private readonly reviewModel: ReturnModelType<typeof Review>,
        @InjectModel(Salary) private readonly salaryModel: ReturnModelType<typeof Salary>,
        @InjectModel(Job) private readonly jobModel: ReturnModelType<typeof Job>
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

    // get all company with pagination
    async getPaginatedCompanyList(page: number, hireType: string, workType: string, name: string, techStack: string, locations: string): Promise<any> {
        let query = {}
        if (name) query = {...query, name: {
            $regex: name,
            $options: "i"
        }}
        if (workType) query = {...query, workType: {
            $regex: workType,
            $options: "i"
        }}
        if (hireType) query = {...query, [`hireType.${hireType}`]: true}
        if (techStack) {
            // let regex = techStack.map( function( val ){ 
            //     return new RegExp( '^['+val+'].*','i' ); 
            // })
            // query = {
            //     ... query, $in: regex
            // }
            query = {...query, techStack: {
                $regex: techStack,
                $options: "i"
            }}
        }
        if (locations) query = {
            ...query,
            locations: {
                $regex: locations,
                $options: "i"
            }
        }
        // console.log(workType)
        return await pagination(this.companyModel, page, query)
    }
    // async getPaginatedCompanyList(page: number): Promise<any> {
    //     return await pagination(this.companyModel, page)
    // }

    // get single company details by company id
    async getSingleCompanyDetail(companyId: string): Promise<Company> {
        return await this.companyModel.findById(companyId)
    }

    // update company details by company id
    async updateCompanyInfo(companyId: string, body: UpdateCompanyDTO): Promise<any> {
        const updateOperations: any = {};
        const pushOperations: any = {}
        
        // Handle nested social object update
        if (body.social) {
            for (const [key, value] of Object.entries(body.social)) {
                if (value !== undefined) {
                    updateOperations[`social.${key}`] = value;
                }
            }
        }
        // Handle nested hire type object update
        if (body.hireType) {
            for (const [key, value] of Object.entries(body.hireType)) {
                if (value !== undefined) {
                    updateOperations[`hireType.${key}`] = value;
                }
            }
        }

        // Handle pushing to locations array
        if (body.locations) {
            pushOperations.locations = { $each: body.locations };
        }

        // Handle pushing to locations array
        if (body.techStack) {
            pushOperations.techStack = { $each: body.techStack }
        }

        // Handle other fields
        const otherFields = [
            'description', 'founded', 'headquarter', 'name', 'numOfEmployees', 'website', 'workType',
        ];
        for (const field of otherFields) {
            if (body[field] !== undefined) {
                updateOperations[field] = body[field];
            }
        }

        // Merge $set and $push/$addToSet operations
        const updateQuery: any = {};
        if (Object.keys(updateOperations).length > 0) {
            updateQuery.$set = updateOperations;
        }
        if (Object.keys(pushOperations).length > 0) {
            updateQuery.$addToSet = pushOperations;
        }

        const updatedCompany = await this.companyModel.findByIdAndUpdate(
            companyId,
            updateQuery,
            { new: true, useFindAndModify: false }
        ).exec();

        return updatedCompany
    }

    // add interview to company
    async addInterview(body: InterviewDTO): Promise<any> {
        const { companyId } =body
        const interview = await this.interviewModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {interviews: interview.id} }, { new: true, useFindAndModify: true })
        return interview
    }

    // add review to company
    async addReview(body: ReviewDTO): Promise<any> {
        const { companyId } =body
        const review = await this.reviewModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {reviews: review.id} }, { new: true, useFindAndModify: true })
        return review
    }

    // add salary to company
    async addSalary(body: SalaryDTO): Promise<any> {
        const { companyId } =body
        const salary = await this.salaryModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {salaries: salary.id} }, { new: true, useFindAndModify: true })
        return salary
    }

    // add job to company
    async addJob(body: JobDTO): Promise<any> {
        const { companyId } =body
        const job = await this.jobModel.create(body)
        await this.companyModel.findByIdAndUpdate(companyId, { $push: {jobs: job.id} }, { new: true, useFindAndModify: true })
        return job
    }
}
