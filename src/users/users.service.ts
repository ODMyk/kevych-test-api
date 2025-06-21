import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UserRegisterDto } from 'src/auth/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userRegisterDto: UserRegisterDto) {
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: userRegisterDto.email,
        password: hashedPassword,
        roles: [UserRole.USER],
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
