import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from '../dirname.js';
import { router } from './router.js';

const app = express();

//Configuración de Mustache
app.set('views', __dirname + '/views');
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

//Configuración del analizador del body
app.use(bodyParser.urlencoded({ extended: true }));

//Configuración de carpeta pública
app.use(express.static(__dirname + '/public'));

app.use('/', router);

app.listen(3000, () => console.log('Listening on port 3000!'));

