const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;

app.listen(port, () => {
	console.log('Servidor levantado');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/header', (req, res) => {
	res.sendFile(__dirname + '/views/header.html');
});

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/views/login.html');
});

app.get('/productDetail', (req, res) => {
	res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/productCart', (req, res) => {
	res.sendFile(__dirname + '/views/productCart.html');
});

app.get('/register', (req, res) => {
	res.sendFile(__dirname + '/views/register.html');
});
