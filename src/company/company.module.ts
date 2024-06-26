import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Company } from './entity/company.entity';
import { CompanyController } from './company.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entity/user.entity';
import { Interview } from 'src/interview/entity/interview.entity';
import { Review } from './entity/review.entity';
import { Salary } from './entity/salary.entity';
import { Job } from './entity/job.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Company, User, Interview, Review, Salary, Job])
  ],
  providers: [CompanyService, JwtService, ConfigService, AuthService],
  controllers: [CompanyController]
})
export class CompanyModule {}
