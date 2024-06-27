import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Review } from './entity/review.entity';
import { ReviewDTO } from './dto/review.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { Company } from 'src/company/entity/company.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review) private readonly reviewModel: ReturnModelType<typeof Review>,
        @InjectModel(Company) private readonly companyModel: ReturnModelType<typeof Company>
    ) {}

    // add review to company
    async addReview(body: ReviewDTO): Promise<any> {
        const { companyId } = body
        let company = await this.companyModel.findById(companyId)
        if(!company) throw new HttpException("No company found", HttpStatus.NOT_FOUND)

        const review = await this.reviewModel.create(body)
        const [{ averageRating }]: any = await this.reviewModel.aggregate([
            {   
                $match: {
                    isShow: true
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating"}
                }
            }
        ])

        company = await this.companyModel.findByIdAndUpdate(companyId, { $push: {reviews: review.id}, $set: { rating: averageRating } }, { new: true, useFindAndModify: true })
        return review
    }

    // get review by company id
    async getReviewByCompanyId(companyId: string): Promise<any>{
        return await this.reviewModel.find({ companyId, isShow: true })
    }

    // helpful review 
    async helpfulReview(reviewId: string, userId: string): Promise<any> {
        return await this.reviewModel.findByIdAndUpdate(reviewId, { $addToSet: { helpful: userId }}, { new: true })
    }

    // hiding unwanted review
    async archiveReview(reviewId: string): Promise<any>{
        let review = await this.reviewModel.findByIdAndUpdate(reviewId, { $set: { isShow: false }}, { new: true })
        
        const [{ averageRating }]: any = await this.reviewModel.aggregate([
            {   
                $match: {
                    isShow: true
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating"}
                }
            }
        ])

        console.log(averageRating)
        await this.companyModel.findByIdAndUpdate(review.companyId, { $push: {reviews: review.id}, $set: { rating: averageRating } }, { new: true, useFindAndModify: true })
        return "review archived successfully"
    }
}
