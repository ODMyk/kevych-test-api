import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResponseDto } from './dtos/auth.dto';
import { UserLoginDto } from './dtos/user.dto';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: userLoginDto.email },
    });

    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      console.log('Invalid password');
      throw new Error('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles as unknown as UserRole[],
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles as unknown as UserRole[],
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
  }
}
