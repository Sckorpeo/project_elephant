import axios from 'axios';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import List from './Components/List.js';

const contentArea = document.getElementsByClassName('page-content-main')[0];

const state = {
	agent: 'brimstone',
	agents: []
};

window.addEventListener('hashchange', () => {
	let hash = window.location.hash.slice(1);

	switch (hash) {
		case 'matches':
			renderMatches();
			break;
		case 'maps':
			renderMaps();
			break;
		case 'agents':
			renderAgents();
			break;
	}
});

window.addEventListener('click', async (alligator) => {
	if (alligator.target.nodeName === "BUTTON" && alligator.target.className === 'delete-text') {

		console.dir(alligator.target);
		const { id } = alligator.target;
		await axios.delete(`/api/matches/${id}`);
		await fetchMatches();
		renderMatches();
	}
});

function btnEvnt() {
	const newMatchBtn = document.getElementById('add-match-btn');
	newMatchBtn.addEventListener('click', function () {
		let newForm = document.createElement('form');
		let winInput = document.createElement('input');
		let lossInput2 = document.createElement('input');
		let agentInput3 = document.createElement('select');
		let newBtn = document.createElement('button');

		newForm.method = 'post';
		newForm.action = '/api/matches';

		winInput.placeholder = 'Rounds Won';
		winInput.type = 'number';
		winInput.name = 'roundsWon';
		winInput.min = '0';

		lossInput2.placeholder = 'Rounds Lost';
		lossInput2.type = 'number';
		lossInput2.name = 'roundsLost';
		winInput.min = '0';

		agentInput3.name = 'agent';

		newBtn.innerHTML = 'Add';

		agentInput3.innerHTML = state.agentOptions;
		newForm.appendChild(winInput);
		newForm.appendChild(lossInput2);
		newForm.appendChild(agentInput3);
		newForm.appendChild(newBtn);
		contentArea.appendChild(newForm);

		winInput.addEventListener('input', updateInputState);
		lossInput2.addEventListener('input', updateInputState);
		agentInput3.addEventListener('input', updateSelectState);

		newForm.addEventListener('submit', async (evt) => {
			evt.preventDefault();

			const { roundsWon, roundsLost, agent } = state;
			console.log('Submitted!', { roundsWon, roundsLost, agent });
			const res = await axios.post('/api/matches', { roundsWon, roundsLost, agent });

			state.matches.push({ ...res.data, 'agent': { name: agent } });
			renderMatches();
		});
	});
}

function updateInputState(evt) {
	state[evt.target.name] = parseInt(evt.target.value);
}

function updateSelectState(evt) {
	state[evt.target.name] = evt.target.value;
}

function fetchHash() {
	if (window.location.hash) {
		const hash = window.location.hash.slice(1);

		switch (hash) {
			case 'matches':
				renderMatches();
				break;
			case 'maps':
				renderMaps();
				break;
			case 'agents':
				renderAgents();
				break;
		}
	}
}


async function fetchMatches() {
	const matches = await axios.get('/api/matches');
	state.matches = matches.data;
}

async function fetchAgents() {
	const agents = await axios.get('/api/agents');
	state.agents = agents.data;
	state.agentOptions = state.agents.map(agent => {
		return `
		<option value="${agent.name}">${agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}</option>
		`
	}).join('');
}

async function fetchMaps() {
	const maps = await axios.get('/api/maps');
	state.maps = maps.data;
}



function renderMatches() {
	let matches;
	const btnHtml = '<button id="add-match-btn">New Match</button>';
	if (!state?.matches.length) {
		matches = '<div>No Content To Display</div>';
	} else {
		matches = state.matches.map(match => {
			return `
			<div class="content-card deletable">
				<div>Match: ${match.id}</div>
				<div>Rounds Won - ${match.roundsWon}</div>
				<div>Rounds Lost - ${match.roundsLost}</div>
				<div>Agent Played - ${match.agent.name}</div>
				<button class="delete-text" id="${match.id}">Delete?</button>
			</div>
			`
		}).join('');
	}
	contentArea.innerHTML = btnHtml.concat(matches);
	btnEvnt();
}

function renderMaps() {
	const { maps } = state;
	const mapsHtml = maps.map(map => {
		return `
		<div class="content-card">${map.name.charAt(0).toUpperCase() + map.name.slice(1)}</div>
		`
	}).join('');
	contentArea.innerHTML = mapsHtml;
}

function renderAgents() {
	const { agents } = state;
	const agentsHtml = agents.map(agent => {
		return `
		<div class="content-card">${agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}</div>
		`
	}).join('');
	contentArea.innerHTML = agentsHtml;
}

async function pageLoad() {
	await fetchMatches();
	await fetchAgents();
	await fetchMaps();
	fetchHash();
}

pageLoad();



// React component usage

const App = () => {
	const [agents, setAgents] = useState([]);
	const handleClick = async (evt) => {
		const agentData = await axios.get(`/api/${evt.target.textContent.toLowerCase()}`);
		setAgents(agentData.data);
	}
	return (
		<div className="page-content">
			<div className="page-sidebar">
				<ul>
					<li><a href="/">Dashboard</a></li>
					<li><a href="/#matches">Matches</a></li>
					<li onClick={handleClick} name='agents' key={'agents'}>Agents</li>
					<li onClick={handleClick} name='maps'>Maps</li>
				</ul>
			</div>
			<div className="page-content-main">
				<List data={agents} />
			</div>
		</div>
	)
}

const box = document.getElementById('root');
const root = createRoot(box);
root.render(<App />);


