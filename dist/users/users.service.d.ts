import { UserRegisterDto } from 'src/auth/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userRegisterDto: UserRegisterDto): Promise<{
        email: string;
        password: string;
        id: string;
        roles: import(".prisma/client").$Enums.UserRole[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneById(id: string): Promise<{
        email: string;
        password: string;
        id: string;
        roles: import(".prisma/client").$Enums.UserRole[];
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
