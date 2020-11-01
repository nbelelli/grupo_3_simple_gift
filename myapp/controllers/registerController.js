registerController = {
	home: (req, res) => {
		res.render('login');
	},
};

const registerController= {
    register: (req, res) => {
        res.send(__dirname + '/views/register.html');
        },
}

module.exports = registerController;