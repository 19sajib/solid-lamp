import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { LifeStyle, LifeStyleUpload } from './entity/LifeStyle.entity';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class LifeStyleService {
    constructor(
        @InjectModel(LifeStyle) private readonly lifeStyleModel: ReturnModelType<typeof LifeStyle>,
        @InjectModel(LifeStyleUpload) private readonly lifeStyleUploadModel: ReturnModelType<typeof LifeStyleUpload>
    ) {}

    async addLifeStyle(imageLinks: string[], companyId: string, reviewerId: string): Promise<any> {
        const result = await this.lifeStyleUploadModel.create({ companyId, reviewerId, imageLinks })
        return "Your images uploaded successfully and an admin will approve it, then it will appear publicly..."
    }

    async getLifeStyle(companyId: string): Promise<any> {
        return await this.lifeStyleModel.findOne({ companyId })
    }



    // --->> Admin Action <<---

    async getUploadByCompanyId(companyId: string): Promise<any> {
        return await this.lifeStyleUploadModel.find({ companyId })
    }

    async reviewUpload(uploadId: string): Promise<any> {
        const result = await this.lifeStyleUploadModel.findByIdAndUpdate(uploadId, { isShow: true }, { new: true })
        await this.addReviewToLifeStyle(result.companyId, result.imageLinks)
        return "Images pushed to company life style"
    }

    async addReviewToLifeStyle(companyId: any, imageLinks: string[]): Promise<any> {
        const existingData = await this.lifeStyleModel.findOne({ companyId })

        let res
        if(existingData) {
            res = await this.lifeStyleModel.findOneAndUpdate({ companyId }, { $push:  {imageLinks}  },{ new: true, useFindAndModify: true })
        } else {
            res = await this.lifeStyleModel.create({ imageLinks, companyId })
        }
        console.log({res})
        return res
    }

}
