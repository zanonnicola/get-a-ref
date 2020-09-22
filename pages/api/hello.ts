import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (_eq: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
