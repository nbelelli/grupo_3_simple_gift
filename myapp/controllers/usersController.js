const { renderFile } = require('ejs');
const { get } = require('http');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { check, validationResult, body } = require('express-validator');
const cookieParser = require('cookie-parser');
const db = require('../database/models');
const User = require('../database/models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const usersController = {
	register: (req, res) => {
		res.locals.title = 'Register';
		res.render('Users/register');
	},

	login: (req, res) => {
		res.locals.title = 'Login';
		res.render('Users/login');
	},

	storeUser: async (req, res) => {
		// Verifica que no existan errores en el form
		const errors = validationResult(req);
		console.log('errores', errors);
		console.log('body', req.body);
		if (!errors.isEmpty()) {
			res.locals.title = 'Register';
			return res.render('Users/register', { errors: errors.errors });
		}

		// Crea un nuevo registro en la DB
		/* 		console.log('avatar: ', req.files[0].filename); */
		await db.User.create({
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			password: bcrypt.hashSync(req.body.password, 5),
			/* avatar: req.files[0].filename, */
			avatar: req.files[0] ? req.files[0].filename : '',
		});
		res.redirect('/Users/login');
	},

	processLogin: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.locals.title = 'Login';
			return res.render('Users/login', { errors: errors.errors });
		}
		//Set Session
		req.session.user = await db.User.findOne({
			where: {
				email: req.body.email,
			},
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
	profile: async (req, res) => {
		res.locals.title = 'Profile Page';
		const user = await db.User.findOne({
			where: {
				email: req.session.user.email,
			},
		});

		res.render('Users/profile', {
			id: user.id,
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			phone: user.phone,
			avatar: user.filename,
		});
	},

	edit: async (req, res) => {
		res.locals.title = 'Edit User';
		const userToEdit = await db.User.findByPk(req.params.id);
		if (userToEdit == undefined) {
			return res.send('Usuario no encontrado');
		} else {
			res.render('Users/userEdit', { userToEdit: userToEdit });
		}
	},
	update: async (req, res) => {
		res.locals.title = 'Edit User';
		const userToEdit = await db.User.findByPk(req.params.id);
		const currentImage = userToEdit.avatar;
		await db.User.update(
			{
				name: req.body.name,
				lastname: req.body.lastname,
				phone: req.body.phone,
				avatar: req.files[0] ? req.files[0].filename : currentImage,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.redirect('/Users/login');
	},
};

module.exports = usersController;
