import { UserRole } from '../enums/user-role.enum';
import { UserResponseDto } from './user.dto';
export declare class AuthResponseDto {
    accessToken: string;
    user: UserResponseDto;
}
export declare class JwtPayloadDto {
    sub: string;
    email: string;
    roles: UserRole[];
    exp?: number;
    iat?: number;
}
