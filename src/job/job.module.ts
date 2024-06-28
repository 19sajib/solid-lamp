import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Job } from './entity/job.entity';
import { Company } from 'src/company/entity/company.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Job, Company, User])
  ],
  controllers: [JobController],
  providers: [JobService, JwtService, AuthService]
})
export class JobModule {}
