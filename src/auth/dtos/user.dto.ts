import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

/**
 * DTO for user login request.
 */
export class UserLoginDto {
  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password (min 6 characters)",
    minLength: 6,
    maxLength: 30,
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}

/**
 * DTO for user registration request.
 */
export class UserRegisterDto extends UserLoginDto {}

/**
 * DTO representing basic user information returned in responses.
 * This is a subset of the full user entity, containing only public information.
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'user-id-123',
  })
  id: string;

  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  email: string;

  @ApiPropertyOptional({ description: "User's username", example: 'JohnDoe' })
  username?: string;

  @ApiProperty({
    description: 'Array of roles assigned to the user',
    enum: UserRole,
    enumName: 'UserRole',
    isArray: true,
    example: [UserRole.USER],
  })
  roles: UserRole[];

  @ApiProperty({
    description: 'ISO 8601 string representing the creation timestamp',
    example: '2025-06-19T16:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'ISO 8601 string representing the last update timestamp',
    example: '2025-06-19T16:30:00Z',
  })
  updatedAt: string;
}
