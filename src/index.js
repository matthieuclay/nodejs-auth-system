require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();

app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded
app.use(express.json()); // application/json
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization',
	);
	next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	console.error(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message, data });
});

mongoose
	.connect(process.env.MONGODB_CONNECT)
	.then(() => {
		app.listen(8080);
	})
	.catch((err) => console.error(err));
