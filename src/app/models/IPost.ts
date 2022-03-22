import { IComment } from './IComment';
import { ITag } from './ITag';
import { IUserTaggedPost } from './IUserTaggedPost';

export interface IPost {
  id?: number;
  userId: number;
  description: string;
  imageSorce: string;
  x_Position: number;
  y_Position: number;
  z_Position: number;
  date: Date;
  likes?: any[];
  comments?: IComment[];
  tags?: ITag[];
  userTaggedPost?: IUserTaggedPost[];
}
