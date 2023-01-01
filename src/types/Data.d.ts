import type { RowDataPacket } from "mysql2";

export interface UserRowDataPacket extends RowDataPacket, UserData {}
export interface UserData {
  id: number;
  user_avatar: string;
  user_name: string;
  user_password: string;
  user_email: string;
}

export interface ArticleCateRowDataPacket
  extends RowDataPacket,
    ArticleCateData {}
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
export interface ArticleRowDataPacket extends RowDataPacket, ArticleData {}

export interface IssuesData {
  id: number;
  title: string;
  content: string;
  tags: string;
  publish_date: string;
  like_count: number;
}
export interface IssuesRowDataPacket extends RowDataPacket, IssuesData {}

export interface IssuePreviewData {
  issue_id: number;
  title: string;
  content: string;
  tags: string;
  publish_date: string;
  user_name: string;
  user_avatar: string;
  like_count: number;
}
export interface IssuePreviewRowDataPacket
  extends RowDataPacket,
    IssuePreviewData {}

export interface IssueMessageListData {
  publish_date: string;
  content: string;
  issue_id: number;
  user_name: string;
  user_avatar: string;
}

export interface IssueLikeData {
  id: number;
  like_issue_id: number;
  user_id: number;
}
