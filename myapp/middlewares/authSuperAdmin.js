module.exports = (req, res, next) => {
	if (!req.session.user || req.session.user.rol != 30) {
		res.redirect('/');
		return next();
	}

	return next();
};
