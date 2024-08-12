import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Interview } from './entity/interview.entity';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { InterviewDTO } from './dto/interview.dto';
import { Company } from 'src/company/entity/company.entity';
import { pagination } from 'src/utils/mongodb/pagination';

@Injectable()
export class InterviewService {
    constructor(
        @InjectModel(Interview) private readonly interviewModel: ReturnModelType<typeof Interview>,
        @InjectModel(Company) private readonly companyModel: ReturnModelType<typeof Company>
    ) {}

    async getInterviewList(companyId: string, page: number, experience: string, position: string, offer: string): Promise<any> {
      let query = {}
      if (position) query = {...query, position: {
          $regex: position,
          $options: "i"
      }}

      if (offer == 'offerReceived') query = {...query, offerReceived: true}
      else if (offer == 'offerAccepted') query = {...query, offerAccepted: true}
      else if (offer == 'noOffer') query = {...query, offerReceived: false}

      if (experience) query = {...query, experience: {
          $regex: experience,
          $options: "i"

      }}
      console.log(query)
      return await pagination(this.interviewModel, page, {...query, companyId: new mongoose.Types.ObjectId(companyId), isShow: true})
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

    // get interview summary
    async getInterviewSummary(companyId: string): Promise<any> {
        let [{ applyMethod, totalInterview, experience, positions }] = await this.interviewModel.aggregate([
            { $match: { companyId: new mongoose.Types.ObjectId(companyId), isShow: true }},
            { $facet: {
                positions: [
                  {
                    $group: {
                      _id: "$position",
                      total: { $sum: 1 }
                    }
                  }
                ],
                applyMethod:[
                    {
                        $group: {
                            _id: "$applyMethod",
                            total: { $sum: 1 }
                        }
                    }
                ],
                totalInterview: [
                  { 
                    $group: { 
                      _id: null, 
                      count: { $sum: 1 } 
                    } 
                  }
                ],
                experience: [
                  {
                    $group: {
                      _id: "$experience",
                      total: { $sum: 1 }
                    }
                  }
                ]
              }
            },
            { 
              $unwind: "$totalInterview" 
            },
            {
              $addFields: {
                totalInterview: "$totalInterview.count"
              }
            },
            {
              $project: {
                positions: 1,
                totalInterview: 1,
                applyMethod: {
                  $map: {
                    input: "$applyMethod",
                    as: "apm",
                    in: {
                      _id: "$$apm._id",
                      total: "$$apm.total",
                      percentage: {
                        $cond: {
                          if: { $gt: ["$totalInterview", 0] },
                          then: { $multiply: [{ $divide: ["$$apm.total", "$totalInterview"] }, 100] },
                          else: 0
                        }
                      }
                    }
                  }
                },
                experience: {
                  $map: {
                    input: "$experience",
                    as: "exp",
                    in: {
                      _id: "$$exp._id",
                      total: "$$exp.total",
                      percentage: {
                        $cond: {
                          if: { $gt: ["$totalInterview", 0] },
                          then: { $multiply: [{ $divide: ["$$exp.total", "$totalInterview"] }, 100] },
                          else: 0
                        }
                      }
                    }
                  }
                }
              }
            }
        ])
        return { applyMethod, totalInterview, experience, positions }
    }

    // archive interview admin action
    async archiveInterview(interviewId: string): Promise<any> {
        const interview = await this.interviewModel.findById(interviewId)
        if(!interview) throw new HttpException("No Interview Found...", HttpStatus.NOT_FOUND)
        
        return this.interviewModel.findByIdAndUpdate(interviewId, { $set: {isShow: false} }, { new: true })
    }
}
