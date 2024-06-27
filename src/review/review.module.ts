import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Review } from './entity/review.entity';
import { Company } from 'src/company/entity/company.entity';
import { User } from 'src/auth/entity/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypegooseModule.forFeature([Review, Company, User])
  ],
  controllers: [ReviewController],
  providers: [ReviewService, AuthService, JwtService]
})
export class ReviewModule {}
