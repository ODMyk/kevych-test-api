import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ENVIRONMENT_VARIABLES } from './constants/environment';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TrainScheduleGateway } from './train-schedule/train-schedule.gateway';
import { TrainScheduleModule } from './train-schedule/train-schedule.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    SchedulesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(ENVIRONMENT_VARIABLES.JWT_SECRET) ?? 'JWT_SECRET',
      }),
    }),
    CommonModule,
    AuthModule,
    FavoritesModule,
    WebsocketModule,
    PrismaModule,
    UsersModule,
    TrainScheduleModule,
  ],
  providers: [TrainScheduleGateway],
})
export class AppModule {}
