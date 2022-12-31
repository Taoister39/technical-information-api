import type { RowDataPacket } from "mysql2";

export interface UserRowDataPacket extends RowDataPacket {
  id: number;
  user_avatar: string;
  user_name: string;
  user_password: string;
  user_email: string;
}

export interface UserData {
  id?: number;
  user_avatar?: string;
  user_name?: string;
  user_password?: string;
  user_email?: string;
}

export interface ArticleCateRowDataPacket extends RowDataPacket {
  id: number;
  name: string;
}

export interface ArticleCateData {
  id: number;
  name: string;
}

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  cover_url: string;
  publish_date: string;
  cate_id: number;
  author_id: number;
  user_name: string;
  user_avatar: string;
}

export interface ArticleRowDataPacket extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  cover_url: string;
  publish_date: string;
  cate_id: number;
  author_id: number;
  user_name: string;
  user_avatar: string;
}
