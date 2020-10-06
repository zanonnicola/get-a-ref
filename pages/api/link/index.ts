import { Link } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import middleware from '../../../utils/middlewares/middleware';
import { PrismaDB } from '../../../utils/prisma';

export interface LinkDTO {
  link?: Link; // To Do: don't pass the whole object
  error?: string;
}

const handler = nextConnect();
handler.use(middleware);

export default handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  if (!query.id) {
    res.json(<LinkDTO>{
      error: `Link with id ${query.id} not found`,
    });
  }

  const db = new PrismaDB();

  const id = parseFloat(query.id as string);
  console.log('--- Retrieving link with id %s ---', id);
  const link = await db.getLink(id);

  res.json(<LinkDTO>{
    link: link,
  });
});
