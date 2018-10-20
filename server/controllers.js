module.exports = {
	login: (req, res) => {
		const dbi = req.app.get('db');
		const {username, password} = req.body;
		dbi.find_user([username])
		.then(user => {
			if(user[0]){
				req.session.user = user[0];
				res.status(200).send(req.session.user)
			}
		})
		.catch(err => {
			res.status(500).send({errorMessage: 'Somethings wrong in ctrl.login'})
			console.log(err)
		})
	},
	register: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password } = req.body;
		dbi
			.register_user([ username, password ])
			.then((newUser) => {
                req.session.user = newUser[0]
				res.status(201).send(req.session.user);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.register' });
				console.log(err);
			});
	},
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
	},
	getBooks: (req, res) => {
		const dbi = req.app.get('db');
		dbi.all_books().then(books=>{
			res.status(200).send(books);
		}).catch((err) => {
			res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.getBooks' });
			console.log(err);
		});
	},
	addBook: (req, res) => {
		const dbi = req.app.get('db');
		const { url, title, author, genre, description } = req.body;
		dbi.new_book([url, title, author, genre, description]).then(book => {
			res.status(200).send(book);
		}).catch((err) => {
			res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.addBook' });
			console.log(err);
		});
	},
	deleteBook: (req, res)=>{
		const dbi = req.app.get('db');
		dbi.delete_book([req.params.id]).then(books=>{
			res.status(200).send(books);
		}).catch((err) => {
			res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.deleteBook' });
			console.log(err);
		});
		console.log('delete ran', req.params.id)

	},
	addToCart: (req, res) => {
		const dbi = req.app.get('db');
		console.log('user id', req.session.user.user_id)
		console.log('book id', req.params.id)
		dbi.add_book_to_cart([req.session.user.user_id, req.params.id]).then(books=>{
			res.status(200).send(books);
		}).catch((err) => {
			res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.addToCart' });
			console.log(err);
		});
		console.log('addToCart ran')
	}
};