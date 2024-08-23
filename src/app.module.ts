import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import config from './config/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { InterviewModule } from './interview/interview.module';
import { ReviewModule } from './review/review.module';
import { SalaryModule } from './salary/salary.module';
import { JobModule } from './job/job.module';
import { BenefitModule } from './benefit/benefit.module';
import { LifestyleModule } from './lifestyle/lifestyle.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
      validationSchema: configValidationSchema 
    }),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("MONGODB_URI"),
      })
    }),
    AuthModule,
    CompanyModule,
    InterviewModule,
    ReviewModule,
    SalaryModule,
    JobModule,
    BenefitModule,
    LifestyleModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
