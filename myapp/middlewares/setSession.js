const path = require('path');
const fs = require('fs');
const db = require('../database/models');

module.exports = async (req, res, next) => {
	if (req.cookies.userId && !req.session.user) {
		req.session.user = await db.User.findOne({
			where: {
				id: req.cookies.userId,
			},
		});
		return next();
	}
	return next();
};
