import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import authMiddleware from './auth';

function onError(err: Error, req: NextApiRequest, res: NextApiResponse) {
  console.error(err, `Request: ${req.url}`);
  res.status(500).end('Something went wrong');
}

const middleware = nextConnect({ onError });
middleware.use(authMiddleware);

export default middleware;
