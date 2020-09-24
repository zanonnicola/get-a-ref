import { MagicUserMetadata } from '@magic-sdk/admin';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { encryptCookie, cookie } from '../../../utils/cookie';
import { magic } from '../../../utils/magic';

export interface LoginDTO {
  authorized: boolean;
  user: unknown;
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<LoginDTO | void> => {
  const { method } = req;

  if (method !== 'POST' || typeof req.headers.authorization === 'undefined') {
    return res.status(405).end();
  }

  try {
    const DIDT = magic.utils.parseAuthorizationHeader(req.headers.authorization);
    magic.token.validate(DIDT);

    const claim = magic.token.decode(DIDT)[1];
    const userMetadata: MagicUserMetadata = await magic.users.getMetadataByIssuer(claim.iss);

    // TO DO: Check if we have the user in the DB otherwise create new one

    const token = await encryptCookie(userMetadata);
    res.setHeader('Set-Cookie', serialize('auth', token, cookie));

    return res.json({ authorized: true, user: 'user' });
  } catch (error) {
    return res.status(401).end();
  }
};
