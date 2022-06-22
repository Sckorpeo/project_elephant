import React, { useState } from 'react';
import Form from './Form.js';

const MatchList = ({ matches, setState, state }) => {

	const handleClick = () => {
		setState({ ...state, toggle: !state.toggle });
	}

	if (matches.length < 1) {
		return (
			<>
				<button onClick={handleClick} id="add-match-btn">New Match</button>
				<div>No Content To Display</div>
			</>
		)
	} else {
		return (
			matches.map(match => {
				return (
					<>
						<button onClick={handleClick} id="add-match-btn">New Match</button>
						<div class="content-card deletable">
							<div>Match: {match.id}</div>
							<div>Rounds Won - {match.roundsWon}</div>
							<div>Rounds Lost - {match.roundsLost}</div>
							<div>Agent Played - {match.agent.name}</div>
							<button class="delete-text" id={match.id}>Delete?</button>
							{/* {state.toggle ?  */}
							<Form agents={state.agents} />
							{/* : null} */}
						</div>
					</>
				)
			})
		)
	}
}

export default MatchList;