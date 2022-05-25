import { conn, Agent, Map, Side } from './index';
import agents from '../helpers/agents';

async function syncAndSeed() {
	await conn.sync({ force: true });
	Promise.all(agents.map(name => Agent.create({ name })));
}


