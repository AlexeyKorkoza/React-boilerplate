import express from 'express';
import cors from 'cors';
import config from 'config';

const app = express();

app.use('/public', express.static(config.paths.public));
app.set('view engine', 'ejs');
app.set('views', config.paths.views);

app.use(cors());

app.get('/', (req, res) => res.render('index'));

app.listen(
    config.app.port,
    config.app.host,
    () => console.log(`Listen on http://${config.app.host}:${config.app.port}`)
);
