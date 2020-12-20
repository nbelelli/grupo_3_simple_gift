module.exports = (req, res, next) => {
	res.locals.userLogged = false;
	if (req.session.user) {
		res.locals.userLogged = req.session.user;
		res.locals.userName = req.session.user.name;
	}

	return next();
};
