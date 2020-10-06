import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from 'next-connect';
import { UserDTO } from '../../pages/api/user';
import { decryptCookie } from '../cookie';

export interface AuthenticatedRequest extends NextApiRequest {
  auth?: User;
}

const authMiddleware: Middleware<AuthenticatedRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  // bail instantly if no session cookie exists
  if (typeof req.cookies.auth === 'undefined') {
    return res.status(401).json(<UserDTO>{ authorized: false });
  }

  // verify & decrypt the cookie
  const userFromCookie = await decryptCookie(req.cookies.auth);

  if (!userFromCookie) {
    return res.status(401).json(<UserDTO>{ authorized: false });
  }

  req.auth = userFromCookie;

  next();
};

export default authMiddleware;
