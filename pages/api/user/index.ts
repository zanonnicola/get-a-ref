import { NextApiRequest, NextApiResponse } from 'next';
import { decryptCookie } from '../../../utils/cookie';

export interface UserDTO {
  authorized: boolean;
  user?: unknown;
  error?: string;
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<UserDTO | void> => {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).end();
  }

  if (typeof req.cookies.auth === 'undefined') {
    return res.json(<UserDTO>{ authorized: false });
  }

  let userFromCookie;

  try {
    userFromCookie = await decryptCookie(req.cookies.auth);
  } catch (error) {
    return res.json(<UserDTO>{ authorized: false, error: 'Can not authorize user at the moment' });
  }
  return res.json(<UserDTO>{ authorized: true, user: userFromCookie });
};
