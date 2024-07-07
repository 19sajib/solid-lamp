import { Module } from '@nestjs/common';
import { BenefitController } from './benefit.controller';
import { BenefitService } from './benefit.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Benefit, BenefitReview } from './entity/benefit.entity';
import { User } from 'src/auth/entity/user.entity';
import { Company } from 'src/company/entity/company.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports:[
    TypegooseModule.forFeature([Benefit, BenefitReview, User, Company])
  ],
  controllers: [BenefitController],
  providers: [BenefitService, JwtService, AuthService]
})
export class BenefitModule {}
