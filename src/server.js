import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes';

const app = express();
const port = process.env.SERVER_PORT || 8000;

app
    .use(bodyParser.urlencoded({ limit: '50mb', extended: true}))
    .use(bodyParser.json({ limit: '50mb'}));
   // .use(indexRoute);

app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server is functional on port ${port}`);
});

export default app;
