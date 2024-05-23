import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET_KEY'),
              signOptions: {
                expiresIn: configService.get('JWT_EXPIRE_LIMIT'),
              },
            }),
          }),
        TypegooseModule.forFeature([User]), 
    ],
    providers: [AuthService]
})
export class AuthModule {}
