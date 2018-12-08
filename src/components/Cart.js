import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import swal from 'sweetalert';
import { booksInCart, bookShelf, clearCart } from './../ducks/reducer';

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
		this.props.clearCart();
	};

	render() {
		let books = this.props.cart.map((book) => {
			return (
				<div key={book.librarycart_id}>
					<div className="book-card">
						<picture>
							<img src={book.image_url} alt={book.title} className="book-cover" />
						</picture>
						<dl className="title-author">
							<h1>{book.title}</h1>
							<p>by</p>
							<h4>{book.author}</h4>
						</dl>
						<dl className="inStock-details">
							<h4>
								In Stock: <span>{book.in_stock ? 'Yes' : 'No'}</span>
							</h4>
							<Link to={`/details/${book.book_id}`}>
								<button className="cart-btns">Details</button>
							</Link>
							<button className="cart-btns" onClick={() => this.removeFromCart(book.librarycart_id)}>
								Remove from cart
							</button>
						</dl>
					</div>
				</div>
			);
		});
		return (
			<div className="cart-main">
				<Nav />
				<div className="cart-tan">
					<div className="cart-top-tan">
						<h1 className="cart-title">My Cart</h1>
						{(this.props.cart.length === 0) ? null : <button className="cart-btns" onClick={this.checkoutCart}>
							Checkout Books
						</button>}
					</div>
					<div className="cart-books-container">{books}</div>
				</div>
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
export default connect(mapStateToProps, { booksInCart, bookShelf, clearCart })(Cart);
