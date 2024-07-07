import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Company } from 'src/company/entity/company.entity';
import { Benefit, BenefitReview } from './entity/benefit.entity';
import { BenefitReviewDTO } from './dto/benefit.dto';

@Injectable()
export class BenefitService {
  constructor(
    @InjectModel(Benefit)
    private readonly benefitModel: ReturnModelType<typeof Benefit>,
    @InjectModel(BenefitReview)
    private readonly benefitReviewModel: ReturnModelType<typeof BenefitReview>,
    @InjectModel(Company)
    private readonly companyModel: ReturnModelType<typeof Company>,
  ) {}

  async addBenefit(body: BenefitReviewDTO): Promise<any> {
    let { benefit, description, reviewer, companyId } = body;

    let company = await this.companyModel.findById(companyId);
    if (!company)
      throw new HttpException('No company found...', HttpStatus.NOT_FOUND);

    // have same catch here
    let benefitResponse;
    let existingBenefit = await this.benefitModel.findOne({ companyId });
    if (existingBenefit) {
      benefitResponse = await this.benefitModel.findOneAndUpdate(
        { companyId },
        { $set: benefit },
      );
    } else {
      benefitResponse = await this.benefitModel.create({ benefit, companyId });
    }
    return await this.benefitReviewModel.create({
      benefit: benefitResponse.id,
      description,
      reviewer,
      companyId,
    });
  }

  async getBenefitByCompanyId(companyId: string): Promise<any> {
    return await this.benefitModel.findOne({ companyId });
  }

  async getBenefitReviewByCompanyId(companyId: string): Promise<any> {
    return await this.benefitReviewModel.findOne({ companyId, isShow: true });
  }

  // ===> Admin Actions <===
  async archiveBenefitReview(benefitReviewId: string): Promise<any> {
    return await this.benefitReviewModel.findByIdAndUpdate(benefitReviewId, {
      $set: { isShow: false },
    });
  }
}
