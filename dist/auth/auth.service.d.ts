import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResponseDto } from './dtos/auth.dto';
import { UserLoginDto } from './dtos/user.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(userLoginDto: UserLoginDto): Promise<AuthResponseDto>;
}
