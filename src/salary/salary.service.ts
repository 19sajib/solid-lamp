import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Salary } from './entity/salary.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { SalaryDTO } from './dto/salary.dto';
import { Company } from 'src/company/entity/company.entity';
import mongoose from 'mongoose';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary)
    private readonly salaryModel: ReturnModelType<typeof Salary>,
    @InjectModel(Company)
    private readonly companyModel: ReturnModelType<typeof Company>,
  ) {}

  // get salaries by company id
  async getSalariesByCompanyId(companyId: string): Promise<any> {
    return await this.salaryModel.find({ companyId, isShow: true })
  }

  // average salary by company id
  async getAverageSalaryByCompanyId(companyId: string): Promise<any> {
    let response = await this.salaryModel.aggregate([
        { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
        {
            $facet: {
                byPosition: [
                    {
                        $group: {
                            _id: "$position",
                            aveBaseSalary: { $avg: "$baseSalary" },
                            aveTotalSalary: { $avg: { $add: ["$baseSalary", "$additional"] } }
                        }
                    }
                ],
                overallAverage: [
                    {
                        $group: {
                            _id: null,
                            overallAveBaseSalary: { $avg: "$baseSalary" }
                        }
                    }
                ]
            }
        },
        {
            $project: {
                byPosition: 1,
                overallAverage: { $arrayElemAt: ["$overallAverage.overallAveBaseSalary", 0] }
            }
        }
    ]);
    return response;
}


  // add salary to company
  async addSalary(body: SalaryDTO): Promise<any> {
    const { companyId } = body;
    let company = await this.companyModel.findById(companyId)
    if(!company) throw new HttpException("No company found...", HttpStatus.NOT_FOUND)
    
    const salary = await this.salaryModel.create(body);
    await this.companyModel.findByIdAndUpdate(
      companyId,
      { $push: { salaries: salary.id } },
      { new: true, useFindAndModify: true },
    );
    return salary;
  }

  // ---->> admin action <<----

  // archive salary entity
  async archiveSalary(salaryId: string): Promise<any> {
    return await this.salaryModel.findByIdAndUpdate(salaryId, { $set: { isShow: false }}, { new: true })
  }
}
