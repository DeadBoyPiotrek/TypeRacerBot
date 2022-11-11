import express, { Request, Response, NextFunction } from 'express';
const port = 3000;
const app = express();

// app.get('/', (req: Request, res: Response) => {
//   res.sendFile('index.html', { root: __dirname });
// });

app.get('/', (req: Request, res: Response) => {
  res.send('<form></form>');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export const raceHandler = (url: string) => {
  console.log('url', url);
  return 'hello';
};
