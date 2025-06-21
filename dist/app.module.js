"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const environment_1 = require("./constants/environment");
const favorites_module_1 = require("./favorites/favorites.module");
const prisma_module_1 = require("./prisma/prisma.module");
const schedules_module_1 = require("./schedules/schedules.module");
const train_schedule_gateway_1 = require("./train-schedule/train-schedule.gateway");
const train_schedule_module_1 = require("./train-schedule/train-schedule.module");
const users_module_1 = require("./users/users.module");
const websocket_module_1 = require("./websocket/websocket.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedules_module_1.SchedulesModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get(environment_1.ENVIRONMENT_VARIABLES.JWT_SECRET) ?? 'JWT_SECRET',
                }),
            }),
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            favorites_module_1.FavoritesModule,
            websocket_module_1.WebsocketModule,
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            train_schedule_module_1.TrainScheduleModule,
        ],
        providers: [train_schedule_gateway_1.TrainScheduleGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map