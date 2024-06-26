import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Salary } from './entity/salary.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { SalaryDTO } from './dto/salary.dto';
import { Company } from 'src/company/entity/company.entity';

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
