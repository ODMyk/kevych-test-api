"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainScheduleGateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const environment_1 = require("../constants/environment");
const users_service_1 = require("../users/users.service");
let TrainScheduleGateway = class TrainScheduleGateway {
    jwtService;
    configService;
    usersService;
    server;
    constructor(jwtService, configService, usersService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
    }
    afterInit() { }
    async handleConnection(client) {
        const token = client.handshake.query.token;
        if (!token) {
            client.disconnect(true);
            return;
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get(environment_1.ENVIRONMENT_VARIABLES.JWT_SECRET),
            });
            const user = await this.usersService.findOneById(payload.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User associated with token not found.');
            }
            client['user'] = {
                id: user.id,
                email: user.email,
                roles: user.roles,
            };
            client.emit('connected', {
                message: 'Successfully connected to real-time updates!',
                userId: user.id,
            });
            await client.join('authenticated-users');
        }
        catch (error) {
            console.error(error);
            client.disconnect(true);
        }
    }
    handleDisconnect() { }
    emitScheduleChange(payload) {
        this.server.to('authenticated-users').emit('schedule:changed', payload);
    }
};
exports.TrainScheduleGateway = TrainScheduleGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TrainScheduleGateway.prototype, "server", void 0);
exports.TrainScheduleGateway = TrainScheduleGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true,
        },
        namespace: '/train-updates',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService])
], TrainScheduleGateway);
//# sourceMappingURL=train-schedule.gateway.js.map