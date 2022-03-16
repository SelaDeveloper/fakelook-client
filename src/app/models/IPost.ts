export interface IPost {
  id?: number;
  userId: number;
  description: string;
  img: string;
  x_position: number;
  y_position: number;
  z_position: number;
  date: Date;
  // likes: number | null;
  // comments: string;
  // hashTag: string;
  // userTag: string;
}
