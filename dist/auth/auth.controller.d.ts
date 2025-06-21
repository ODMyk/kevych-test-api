import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth.dto';
import { UserLoginDto, UserRegisterDto } from './dtos/user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(userRegisterDto: UserRegisterDto): Promise<AuthResponseDto>;
    login(userLoginDto: UserLoginDto): Promise<AuthResponseDto>;
}
