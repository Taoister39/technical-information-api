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
