
const contentArea = document.getElementsByClassName('page-content-main')[0];
const newMatchBtn = document.getElementById('add-match-btn');

newMatchBtn.addEventListener('click', function () {
	let newForm = document.createElement('form');
	let winInput = document.createElement('input');
	let lossInput2 = document.createElement('input');
	let agentInput3 = document.createElement('input');
	let newBtn = document.createElement('button');

	newForm.method = 'post';

	winInput.placeholder = 'Rounds Won';
	winInput.type = 'number';
	winInput.name = 'roundsWon';
	winInput.min = '0';

	console.dir(winInput);
	lossInput2.placeholder = 'Rounds Lost';
	lossInput2.type = 'number';
	lossInput2.name = 'roundsLost';
	winInput.min = '0';

	agentInput3.placeholder = 'Agent Picked';
	agentInput3.name = 'agent';

	newBtn.innerHTML = 'Add';

	newForm.appendChild(winInput);
	newForm.appendChild(lossInput2);
	newForm.appendChild(agentInput3);
	newForm.appendChild(newBtn);
	console.dir(newForm)
	contentArea.appendChild(newForm);
	// contentArea.appendChild()
});