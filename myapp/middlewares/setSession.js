const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data/usersDataBase.json');

function getAllUsers() {
	return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
}

module.exports = (req, res, next) => {
	if (req.cookies.userId && !req.session.user) {
		req.session.user = getAllUsers().find((user) => {
			return user.id == req.cookies.userId;
		});
		console.log('la sessoin deberia ser...', req.session.user);
		return next();
	}
	return next();
};
