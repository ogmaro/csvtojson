import express, { Application, Request, Response } from 'express';
import csvtojson from 'csvtojson';
import { promises as fspromises } from 'fs';
const detailsLocation = './build/data/details.json';
const csvFilePath = './build/data/details.csv';
const PORT = 3000;

const app: Application = express();

app.get('/convert', async (req: Request, res: Response) => {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  let data = jsonArray.map((value) => {
    if (!value.phone) {
      value.phone = 'missing data';
    }
    return value;
  });
  const details = await fspromises.writeFile(
    detailsLocation,
    JSON.stringify(data, null, 2)
  );
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Serve running on ${PORT}`);
});
