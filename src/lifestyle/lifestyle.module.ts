import { Module } from '@nestjs/common';
import { LifestyleController } from './lifestyle.controller';
import { LifestyleService } from './lifestyle.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [LifestyleController],
  providers: [LifestyleService, CloudinaryService]
})
export class LifestyleModule {}
