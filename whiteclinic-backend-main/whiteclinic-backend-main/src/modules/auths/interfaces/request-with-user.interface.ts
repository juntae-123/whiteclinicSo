import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    user_id: number;
    user_email?: string;
    is_admin: number;
  };
  cookies: {
    accessToken: string;
    refreshToken: string;
  };
}
