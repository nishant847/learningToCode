import { ISkills } from './ISkill';

export interface IEmployee {
  id: number;
  name: string;
  contactPreference: string;
  email: string;
  phone?: number;
  skills: ISkills[];
}
