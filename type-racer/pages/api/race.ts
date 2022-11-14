// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { scrape } from '../../helpers/imSpeed';
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // json to string
  const { url } = JSON.parse(req.body);
  console.log('url', url);
  console.log('scraping');
  await scrape(url);
  res.status(200).json({ name: 'John Doe' });
}
