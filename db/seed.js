import { conn, Agent, Map, Side, Role } from './index.js';
import { maps, agents, roles, sides } from '../helpers/data.js';

async function syncAndSeed() {
	await conn.sync({ force: true });
	Promise.all(agents.map(name => Agent.create({ name })));
	Promise.all(maps.map(name => Map.create({ name })));
	Promise.all(sides.map(name => Side.create({ name })));
	Promise.all(roles.map(name => Role.create({ name })));
}

export default syncAndSeed;


