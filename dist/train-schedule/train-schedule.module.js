"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const environment_1 = require("../constants/environment");
const users_module_1 = require("../users/users.module");
const train_schedule_gateway_1 = require("./train-schedule.gateway");
let TrainScheduleModule = class TrainScheduleModule {
};
exports.TrainScheduleModule = TrainScheduleModule;
exports.TrainScheduleModule = TrainScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get(environment_1.ENVIRONMENT_VARIABLES.JWT_SECRET) ?? 'JWT_SECRET',
                }),
            }),
            users_module_1.UsersModule,
        ],
        providers: [train_schedule_gateway_1.TrainScheduleGateway],
        exports: [train_schedule_gateway_1.TrainScheduleGateway],
    })
], TrainScheduleModule);
//# sourceMappingURL=train-schedule.module.js.map