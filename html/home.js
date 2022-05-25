function renderHome(data) {
	return `
	<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Valo Stats Home</title>
	<link rel="stylesheet" href="../public/styles.css">
</head>

<body>
	<nav>
		<h1>Valo Stats</h1>
	</nav>
	<div class="page-content">
		<div class="page-sidebar">
			<ul>
				<li><a href="/matches">Matches</a></li>
				<li><a href="/">Dashboard</a></li>
				<li><a href="/agents">Agents</a></li>
				<li><a href="/maps">Maps</a></li>
			</ul>
		</div>
		<div class="page-content-main">
				${!data ? 'No Content To Display' : data.map(item => `<div class="content-card">${item.name}</div>`).join('')}
		</div>
	</div>
</body>

</html>
	`
}

export default renderHome;