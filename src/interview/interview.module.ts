import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Interview } from './entity/interview.entity';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/entity/user.entity';
import { Company } from 'src/company/entity/company.entity';

@Module({
    imports: [
        TypegooseModule.forFeature([Interview, User, Company])
    ],
    providers: [InterviewService, JwtService, AuthService, ConfigService],
    controllers: [InterviewController]
})
export class InterviewModule {}
