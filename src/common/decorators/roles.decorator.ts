import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../auth/enums/user-role.enum'; // Import your UserRole enum

export const ROLES_KEY = 'roles'; // Key used to store and retrieve roles metadata
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
