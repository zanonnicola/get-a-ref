import { MagicUserMetadata } from '@magic-sdk/admin';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { encryptCookie, cookieOptions } from '../../../utils/cookie';
import { magic } from '../../../utils/magic';
import { PrismaDB } from '../../../utils/prisma';
import { randomUserName } from '../../../utils/random-username';

export interface LoginDTO {
  authorized: boolean;
  user: unknown;
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<LoginDTO | void> => {
  const { method } = req;

  if (method !== 'POST' || typeof req.headers.authorization === 'undefined') {
    return res.status(405).end();
  }

  const db = new PrismaDB();

  try {
    const DIDT = magic.utils.parseAuthorizationHeader(req.headers.authorization);
    magic.token.validate(DIDT);

    const claim = magic.token.decode(DIDT)[1];
    const userMetadata: MagicUserMetadata = await magic.users.getMetadataByIssuer(claim.iss);

    if (!userMetadata.issuer || !userMetadata.email) {
      return res.status(401).end();
    }

    let user = await db.getUser(userMetadata.issuer);

    if (!user) {
      user = await db.insertUser({
        userIss: userMetadata.issuer,
        email: userMetadata.email,
      });

      await db.insertProfile(
        {
          userName: randomUserName(),
        },
        user.id
      );
    }

    const token = await encryptCookie(userMetadata);
    res.setHeader('Set-Cookie', serialize('auth', token, cookieOptions));

    return res.json({
      authorized: true,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).end();
  } finally {
    await db.disconnect();
  }
};
