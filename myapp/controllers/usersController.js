const { renderFile } = require('ejs');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { check, validationResult, body } = require('express-validator');
const cookieParser = require('cookie-parser');
const db = require('../database/models');
const User = require('../database/models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const file = path.join(__dirname, '../data/usersDataBase.json');

function getAllUsers() {
	return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function generateNewId() {
	const users = getAllUsers();
	return users.pop().id + 1;
}

function writeUser(user) {
	const users = getAllUsers();
	const usersToSave = [...users, user];
	const userToJson = JSON.stringify(usersToSave, null, ' ');
	fs.writeFileSync(file, userToJson);
}

const usersController = {
	register: (req, res) => {
		res.locals.title = 'Register';
		res.render('register');
	},
	login: (req, res) => {
		res.locals.title = 'Login';
		res.render('login');
	},
	storeUser: async(req, res) =>{
        // Verifica que no existan errores en el form
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.locals.title = 'Login';
			return res.render('login', { errors: errors.errors });
		}
        // Crea un nuevo registro en la DB
        await db.User.create({
                name: req.body.name,
                lastName: req.body.lastName, 
				email: req.body.email,
				phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, 5),
                image: req.files[0].filename
        })
		res.redirect('/users/login');
    },

	processLogin: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.locals.title = 'Login';
			return res.render('login', { errors: errors.errors });
		}
		//Set Session
		req.session.user = getAllUsers().find((user) => {
			return user.email == req.body.email;
		});

		//Set Cookie
		if (req.body.rememberMe) {
			res.cookie('userId', req.session.user.id, { maxAge: 1000 * 60 * 60 });
		}

		return res.redirect('/');
	},
	logout: (req, res, next) => {
		req.session.destroy();
		if (req.cookies.userId) {
			res.cookie('userId', 'logout', { maxAge: -1 });
		}
		return res.redirect('/');
	},
	profile: (req, res) => {
		const user = getAllUsers().find((user) => {
			return user.email === req.session.user.email;
		});
		res.render('profile', {
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			phone: user.phone,
			avatar: user.filename,
		});
	},
};

module.exports = usersController;
