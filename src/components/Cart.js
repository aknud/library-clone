import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import swal from 'sweetalert';
import { booksInCart, bookShelf } from './../ducks/reducer';

class Cart extends React.Component {
	componentDidMount = () => {
		if (this.props.cart.length === 0) {
			axios.get('/api/cart').then((res) => {
				this.props.booksInCart(res.data);
			});
		}
	};
	removeFromCart = (id) => {
		axios.delete(`/api/removeFromCart/${id}`).then((res) => {
			this.props.booksInCart(res.data);
		});
	};
	checkoutCart = () => {
		//put all book_id's in an array to send to the backend
		let bookIds = this.props.cart.map((item) => item.book_id);

		axios
			.post(`/api/addToShelf`, bookIds)
			.then(() => {
				this.props.history.push('/browse');
			})
			.catch((err) => console.log('checkoutCart has an error', err));
		swal({
			title: 'Books have been added to your bookshelf.',
			text: 'Go to My Shelf to see your titles.',
			icon: 'success'
		});
	};

	render() {
		const size = {
			height: '115px',
			width: '100px'
		};
		let books = this.props.cart.map((book) => {
			return (
				<div key={book.librarycart_id} style={{ border: '1px solid red' }}>
					<div>
						<picture>
							<img style={size} src={book.image_url} alt={book.title} />
						</picture>
						<h1>Title: {book.title}</h1>
						<h4>Author: {book.author}</h4>
						<h4>In Stock: {book.in_stock ? 'Yes' : 'No'}</h4>
						<Link to={`/details/${book.book_id}`}>
							<button>Details</button>
						</Link>
						<button onClick={() => this.removeFromCart(book.librarycart_id)}>- Remove from cart</button>
					</div>
				</div>
			);
		});
		return (
			<div>
				<Nav />
				<h1>My Cart</h1>
				<button onClick={this.checkoutCart}>Checkout Books</button>
				<div>{books}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		books: state.books,
		cart: state.cart,
		shelf: state.shelf
	};
};
export default connect(mapStateToProps, { booksInCart, bookShelf })(Cart);
