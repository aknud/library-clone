module.exports = {
	login: (req, res) => {
		const dbi = req.app.get('db');
		const {username, password} = req.body;
		dbi.find_user([username])
		.then(user => {
			if(user[0]){
				console.log('user[0]', user[0])
				req.session.user = user[0];
				res.status(200).send(req.session.user)
			}
		})
		.catch(err => {
			res.status(500).send({errorMessage: 'Somethings wrong in ctrl.login'})
			console.log(err)
		})
		console.log('login fired');
	},
	register: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password } = req.body;
		dbi
			.register_user([ username, password ])
			.then((newUser) => {
                req.session.user = newUser[0]
				res.status(201).send(req.session.user);
				console.log('register fired', newUser);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.register' });
				console.log(err);
			});
	},
	logout: (req, res) => {
		req.session.destroy();
		res.json(true);
	}
};