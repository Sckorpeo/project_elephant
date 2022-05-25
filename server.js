import express from 'express';
import morgan from 'morgan';
import syncAndSeed from './db/seed.js';
import { Agent, Map, Side, Match } from './db/index.js';
import renderHome from './html/home.js';
import renderMatches from './html/matches.js';
const server = express();

server.use('/public', express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

server.get('/', (req, res) => {
	const html = renderHome();
	res.send(html);
});

server.get('/matches', async (req, res, next) => {
	try {
		const matches = await Match.findAll();
		console.log(matches);
		const html = renderMatches(matches);
		res.send(html);
	}
	catch (err) {
		next(err);
	}

});

server.post('/matches', async (req, res, next) => {
	try {
		const { roundsWon, roundsLost, agent } = req.body;
		const agentId = (await Agent.findAll({
			where: {
				name: agent.toLowerCase()
			}
		}))[0].id;
		await Match.create({ roundsWon, roundsLost, agentId: agentId });
		res.redirect('/matches');
	}
	catch (err) {
		next(err);
	}

});

server.get('/agents', async (req, res, next) => {
	try {
		const agents = await Agent.findAll();
		const html = renderHome(agents);
		res.send(html);
	} catch (err) {
		next(err)
	}
});

server.get('/maps', async (req, res, next) => {
	try {
		const maps = await Map.findAll();
		const html = renderHome(maps);
		res.send(html);
	} catch (err) {
		next(err)
	}
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