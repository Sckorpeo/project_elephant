import Sequelize, { STRING, INTEGER, TEXT } from 'sequelize';
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Agent = conn.define('agent', {
	name: {
		type: STRING(20),
		notNull: true,
		validate: {
			notEmpty: false,
		}
	}
});

const Role = conn.define('role', {
	name: {
		type: STRING(20),
		notNull: true,
		validate: {
			notEmpty: true,
		}
	}
});

const Map = conn.define('map', {
	name: {
		type: STRING(20),
		notNull: true,
		validate: {
			notEmpty: true,
		}
	}
});

const Match = conn.define('match', {
	roundsWon: {
		type: INTEGER,
		notNull: true
	},
	roundsLost: {
		type: INTEGER,
		notNull: true
	},
	elims: {
		type: INTEGER
	},
	selfElims: {
		type: INTEGER
	}
});

const Round = conn.define('round', {
	roundNumber: {
		type: INTEGER,
		notNull: true
	},
	comment: {
		type: TEXT,
	},
	elims: {
		type: INTEGER
	},
	selfElims: {
		type: INTEGER
	}
});

const Side = conn.define('side', {
	name: {
		type: STRING(20),
		notNull: true,
		validate: {
			notEmpty: true
		}
	}
});

Agent.hasMany(Match);
Match.belongsTo(Agent);

export {
	conn,
	Agent,
	Role,
	Round,
	Side,
	Map,
	Match
};