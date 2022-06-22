import React, { useState } from 'react';

const Form = ({ agents }) => {

	const [roundsWon, setWon] = useState();
	const [roundsLost, setLost] = useState();

	function handleUpdate(evt) {
		console.log(evt);
	}

	return (
		<div>
			<form method='post' action='/api/matches'>
				<input onChange={handleUpdate} min={0} name='roundsWon' type='number' placeholder='Rounds Won' />
				<input onChange={handleUpdate} min={0} name='roundsLost' type='number' placeholder='Rounds Lost' />
				<select name='agent'>
					{agents.map(agent => {
						return <option value={agent.name}>{agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}</option>
					}).join('')}
				</select>
				<button>Add</button>
			</form>
		</div>
	);
}

export default Form;