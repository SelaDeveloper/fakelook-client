import { IPost } from './IPost';
import { ITag } from './ITag';
import { IUser } from './IUser';
import { IUserTaggedComment } from './IUserTaggedComment';

export interface IComment {
  content: string;
  user: IUser;
  postId: number;
  tags?: ITag[];
  userTaggedComment: IUserTaggedComment[];
}
