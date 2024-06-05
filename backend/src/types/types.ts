import { ERole } from '../enums/roles.enum';

export interface IUser {
  id: string;
  email: string;
  role: ERole;
}

export interface IEducation {
  city: string;
  year: string;
  degree: string;
  university: string;
}
