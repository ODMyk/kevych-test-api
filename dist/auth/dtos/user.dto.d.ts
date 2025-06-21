import { UserRole } from '../enums/user-role.enum';
export declare class UserLoginDto {
    email: string;
    password: string;
}
export declare class UserRegisterDto extends UserLoginDto {
}
export declare class UserResponseDto {
    id: string;
    email: string;
    username?: string;
    roles: UserRole[];
    createdAt: string;
    updatedAt: string;
}
