import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { UserResponseDto } from './user.dto';

/**
 * DTO for authentication response, containing JWT and user info.
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string;

  @ApiProperty({
    type: UserResponseDto,
    description: "Authenticated user's public information",
  })
  @ValidateNested()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}

/**
 * DTO representing the payload contained within the JWT.
 * This should match the data you sign into the JWT.
 */
export class JwtPayloadDto {
  @ApiProperty({
    description: 'Subject of the token (User ID)',
    example: 'user-id-123',
  })
  sub: string; // User ID

  @ApiProperty({
    description: "User's email address",
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Array of roles of the user',
    enum: UserRole,
    enumName: 'UserRole',
    isArray: true,
    example: [UserRole.USER],
  })
  roles: UserRole[];

  @ApiPropertyOptional({
    description: 'Timestamp when the token expires (Unix timestamp)',
    example: 1678886400,
  })
  exp?: number;

  @ApiPropertyOptional({
    description: 'Timestamp when the token was issued (Unix timestamp)',
    example: 1678799999,
  })
  iat?: number;
}
