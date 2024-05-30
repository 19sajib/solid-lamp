import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Company } from './entity/company.entity';
import { CompanyController } from './company.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Company, User])
  ],
  providers: [CompanyService, JwtService, ConfigService, AuthService],
  controllers: [CompanyController]
})
export class CompanyModule {}
