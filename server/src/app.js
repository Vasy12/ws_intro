const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);
const aWss = expressWs.getWss('/');
app.use(express.json());

app.ws('/', function(ws, req) {
	ws.on('message', function(msg) {
		console.log(msg);
		aWss.clients.forEach(function(client) {
			client.send(msg);
		});
	});
	console.log('socket', req.testing);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Example app listening on port ${ PORT }!`));


