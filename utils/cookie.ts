import Iron from '@hapi/iron';
import { MagicUserMetadata } from '@magic-sdk/admin';
import { CookieSerializeOptions } from 'cookie';

export interface Cookie {
  maxAge: number;
  secure: boolean;
  httpOnly: boolean;
  path: string;
  sameSite: string;
}

export const cookieOptions: CookieSerializeOptions = {
  maxAge: 60 * 60 * 2, // 2 hours
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
};

export const decryptCookie = async (cookie: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return await Iron.unseal(cookie, process.env.ENCRYPTION_SECRET!, Iron.defaults);
};

export const encryptCookie = async (userMetadata: MagicUserMetadata) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return await Iron.seal(userMetadata, process.env.ENCRYPTION_SECRET!, Iron.defaults);
};
