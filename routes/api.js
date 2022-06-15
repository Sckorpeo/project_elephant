import express from 'express';
import { Agent, Map, Side, Match } from '../db/index.js';

const api = express.Router();

api.get('/maps', async (req, res) => {
	const maps = await Map.findAll();
	res.send(maps);
});

api.get('/agents', async (req, res) => {
	const agents = await Agent.findAll();
	res.send(agents);
});

api.get('/matches', async (req, res) => {
	const matches = await Match.findAll({ include: { model: Agent } });
	res.send(matches);
});

api.post('/matches', async (req, res, next) => {
	try {
		const { roundsWon, roundsLost, agent } = req.body;
		const agentId = (await Agent.findAll({
			where: {
				name: agent.toLowerCase()
			}
		}))[0].id;
		res.status(201).send(await Match.create({ roundsWon, roundsLost, agentId: agentId }));
	}
	catch (err) {
		next(err);
	}

});

api.delete('/matches/:id', async (req, res, next) => {
	try {
		const match = await Match.findByPk(req.params.id);
		await match.destroy();
		res.sendStatus(204);
	}
	catch (err) {
		next(err);
	}
});

export default api;