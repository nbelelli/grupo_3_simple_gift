module.exports = (req, res, next) => {
	if (!req.session.user || req.session.user.rol == 10) {
		/* res.redirect('../users/login'); */
		res.redirect('/');
		return next();
	}

	return next();
};
