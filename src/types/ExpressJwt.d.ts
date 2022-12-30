namespace Express {
  interface Auth {
    id?: number;
    user_name?: string;
  }
  interface Request {
    auth?: Auth;
  }
}
