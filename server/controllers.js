const pgp = require('pg-promise')();

module.exports = {
	login: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password } = req.body;
		dbi
			.find_user([ username ])
			.then((user) => {
				if (user[0]) {
					req.session.user = user[0];
					console.log(req.session.user);
					res.status(200).send(req.session.user);
				}
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.login' });
				console.log(err);
			});
	},
	register: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password } = req.body;
		dbi
			.register_user([ username, password ])
			.then((newUser) => {
				req.session.user = newUser[0];
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
		dbi
			.all_books()
			.then((books) => {
				res.status(200).send(books);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.getBooks' });
				console.log(err);
			});
		console.log('user on sesh', req.session.user);
	},
	addBook: (req, res) => {
		const dbi = req.app.get('db');
		const { image_url, title, author, genre, description } = req.body;
		dbi
			.new_book([ image_url, title, author, genre, description ])
			.then((book) => {
				res.status(200).send(book);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.addBook' });
				console.log(err);
			});
	},
	deleteBook: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.delete_book([ req.params.id ])
			.then((books) => {
				res.status(200).send(books);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.deleteBook' });
				console.log(err);
			});
		console.log('delete ran', req.params.id);
	},
	addToCart: (req, res) => {
		const dbi = req.app.get('db');
		console.log(req.session.user, req.params.id);
		dbi
			.add_book_to_cart([ req.session.user.user_id, req.params.id ])
			.then((books) => {
				res.status(200).send(books);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.addToCart' });
				console.log(err);
			});
	},
	booksInCart: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.books_in_cart([ req.session.user.user_id ])
			.then((books) => {
				res.status(200).send(books);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.booksInCart' });
				console.log(err);
			});
	},
	removeFromCart: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.remove_from_cart([ req.session.user.user_id, req.params.id ])
			.then((books) => {
				res.status(200).send(books);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.booksInCart' });
				console.log(err);
			});
	},
	editBook: (req, res) => {
		const dbi = req.app.get('db');
		const { image_url, title, author, genre, description } = req.body;
		dbi
			.edit_book([ req.params.id, image_url, title, author, genre, description ])
			.then((book) => {
				res.status(200).send(book);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.addBook' });
				console.log(err);
			});
	},
	addToShelf: (req, res) => {
		const dbi = req.app.get('db');
		console.log('BE', Array.isArray(req.body))
		dbi.add_to_shelf([req.session.user.user_id, req.body]).then((book) => {
			res.status(200).send(book);
		})
		.catch((err) => {
			res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.addToShelf' });
			console.log(err);
		});
	},
	getShelf: (req, res) => {
		const dbi = req.app.get('db');
		dbi.books_on_shelf([req.session.user.user_id]).then((books) => {
			res.status(200).send(books);
		})
		.catch((err) => {
			res.status(500).send({ errorMessage: 'Somethings wrong in ctrl.getShelf' });
			console.log(err);
		});
	}
};
