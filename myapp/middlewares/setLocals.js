module.exports = (req, res, next) => {
	res.locals.userLogged = false;
	if (req.session.user) {
		res.locals.userLogged = req.session.user;
	}

	return next();
};
