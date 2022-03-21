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
  comments?: string;
  hashTag?: string;
  userTag?: string;
}
