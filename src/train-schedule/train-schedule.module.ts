import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ENVIRONMENT_VARIABLES } from 'src/constants/environment';
import { UsersModule } from 'src/users/users.module';
import { TrainScheduleGateway } from './train-schedule.gateway';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(ENVIRONMENT_VARIABLES.JWT_SECRET) ?? 'JWT_SECRET',
      }),
    }),
    UsersModule,
  ],
  providers: [TrainScheduleGateway],
  exports: [TrainScheduleGateway],
})
export class TrainScheduleModule {}
