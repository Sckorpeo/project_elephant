import express from 'express';
import morgan from 'morgan';
import syncAndSeed from './db/seed.js';
import { Agent, Map, Side, Match } from './db/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './routes/api.js';

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use('/public', express.static('public'));
server.use('/dist', express.static('dist'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan('dev'));
server.use('/api', api);

server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
	try {
		await syncAndSeed();
		console.log(`Listening on port ${PORT}`);
	}
	catch (err) {
		console.log(err);
	}
});