const { renderFile } = require('ejs');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const bcryptjs = require('bcryptjs');

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
	const userToJson = JSON.stringify(usersToSave, null, " ");
	fs.writeFileSync(file, userToJson);
}


const usersController = {
	register: (req, res) => {
		res.locals.title = "Register";  
		res.render('register');
	},
	login: (req, res) => {
		res.locals.title = "Login";  
		res.render('login');
	},
	storeUser: (req, res)=> {
		const passwordHashed= bcryptjs.hashSync(req.body.password, 6)
		const newUser= {
			id: generateNewId(),
			name:req.body.name,
			lastname:req.body.lastname,
			email: req.body.email,
			phone:req.body.phone,
			avatar: req.files[0].filename,
			password:passwordHashed
		}
		writeUser(newUser);
		res.redirect('/users/login');
	}
};


module.exports = usersController;
