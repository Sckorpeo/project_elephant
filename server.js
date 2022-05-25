import express from 'express';
import syncAndSeed from './db/seed.js';
const server = express();

server.get('/', (req, res) => {
	res.write('hello world');
	res.end();
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