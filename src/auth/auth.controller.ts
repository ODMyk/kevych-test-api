import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthResponseDto } from './dtos/auth.dto';
import { UserLoginDto, UserRegisterDto } from './dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Set HTTP status code for successful creation
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered and logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failed or user already exists)',
  })
  async register(
    @Body(new ValidationPipe()) userRegisterDto: UserRegisterDto,
  ): Promise<AuthResponseDto> {
    await this.usersService.create(userRegisterDto);
    return this.authService.login(userRegisterDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK) // Explicitly set HTTP status code
  @ApiOperation({ summary: 'Login a user and get JWT' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (Invalid credentials)',
  })
  async login(
    @Body(new ValidationPipe()) userLoginDto: UserLoginDto,
  ): Promise<AuthResponseDto> {
    // The authService.login method will handle finding the user,
    // validating the password, and generating the JWT.
    try {
      const authResponse = await this.authService.login(userLoginDto);
      if (!authResponse) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return authResponse;
    } catch (error) {
      // Re-throw specific errors for NestJS error handling
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      // Catch any other errors (e.g., user not found) and re-map to unauthorized
      throw new UnauthorizedException(
        'Login failed. Please check your credentials.',
      );
    }
  }
}
