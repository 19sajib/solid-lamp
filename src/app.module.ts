import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import config from './config/config';

@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    load: [config],
    validationSchema: configValidationSchema
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
