module.exports = {
	login: (req, res) => {
		const dbi = req.app.get('db');
		console.log('login fired');
	},
	register: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password } = req.body;
		dbi
			.register_user([ username, password ])
			.then((newUser) => {
                req.session.user = newUser[0]
				res.status(200).send(req.session.user);
				console.log('register fired', newUser);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.register' });
				console.log(err);
			});
	},
	logout: (req, res) => {
		req.session.destroy();
		res.status(200);
	}
};