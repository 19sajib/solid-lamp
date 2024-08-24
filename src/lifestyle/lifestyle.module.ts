import { Module } from '@nestjs/common';
import { LifeStyleController } from './lifestyle.controller';
import { LifeStyleService } from './lifestyle.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { LifeStyle, LifeStyleUpload } from './entity/LifeStyle.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([LifeStyle, LifeStyleUpload, User])
  ],
  controllers: [LifeStyleController],
  providers: [LifeStyleService, CloudinaryService, JwtService, AuthService]
})
export class LifestyleModule {}
