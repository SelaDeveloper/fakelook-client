import { IUser } from './IUser';

export interface IGroup {
  groupName: string;
  users: IUser[];
}
