indexController = {
	home: (req, res) => {
		res.locals.title = "Home";  
		res.render('index');
	},
};

module.exports = indexController;
