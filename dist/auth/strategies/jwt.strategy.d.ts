import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { JwtPayloadDto } from '../dtos/auth.dto';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: JwtPayloadDto): Promise<any>;
}
export {};
