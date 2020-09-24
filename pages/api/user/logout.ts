import { NextApiRequest, NextApiResponse } from 'next';
import { decryptCookie, cookieOptions } from '../../../utils/cookie';
import { serialize } from 'cookie';
import { magic } from '../../../utils/magic';

export interface UserDTO {
  authorized: boolean;
  user?: unknown;
  error?: string;
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<UserDTO | void> => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).end();
  }

  res.setHeader(
    'Set-Cookie',
    serialize('auth', '', {
      ...cookieOptions,
      expires: new Date(Date.now() - 1),
    })
  );

  let userFromCookie;

  try {
    userFromCookie = await decryptCookie(req.cookies.auth);
  } catch (error) {
    return res.json(<UserDTO>{ authorized: false, error: 'Can not logout user at the moment' });
  }
  await magic.users.logoutByToken(userFromCookie.publicAddress);

  return res.json({ authorized: false });
};
