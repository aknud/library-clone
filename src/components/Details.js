import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Nav from './Nav';
import { getBooks, booksInCart } from './../ducks/reducer';

export class Details extends React.Component {
	constructor() {
		super();
		this.state = {
			inCart: false
		};
	}
	handleDelete = (id, title) => {
		swal({
			title: 'Are you SURE you want to delete this?',
			text: `If you press Obliterate, ${title} will be gone forever. No take-backs.`,
			icon: 'warning',
			buttons: [ 'Omg, NO!', 'Obliterate it!' ],
			dangerMode: true
		})
			.then((willDelete) => {
				if (willDelete) {
					axios.delete(`/api/delete/${id}`).then((res) => {
						this.props.getBooks(res.data);
						this.props.history.push('/browse');
					});
					swal({
						title: 'Exterminated!',
						text: 'No second chances'
					});
				} else {
					swal({
						text: `${title} is safe. Thank you for letting it stay.`,
						button: 'Whew!'
					});
				}
			})
			.catch((err) => console.log('handleDelete has an error', err));
	};
	addToCart = (id) => {
		axios.post(`/api/addToCart/${id}`).then((res) => {
			this.props.booksInCart(res.data);
			this.props.history.push('/browse');
		});
		swal({
			title: 'Book has been added to your cart.',
			text: 'Go to Cart to checkout items to your shelf.'
		});
	};
	render() {
		let selectedBook = this.props.books
			.filter((book) => book.book_id === +this.props.match.params.id)
			.map((book) => {
				return (
					<div key={book.book_id} className="book-info">
						<img className="book-cover" src={book.image_url} alt={book.title} />
						<div>
							<h4>
								Title: <span className="book-info-details">{book.title}</span>
							</h4>
							<h4>
								Author: <span className="book-info-details">{book.author}</span>
							</h4>
							<h4>
								Genre: <span className="book-info-details">{book.genre}</span>
							</h4>
							<h4>
								In Stock: <span className="book-info-details">{book.in_stock ? 'Yes' : 'No'}</span>
							</h4>
							<h4>Description:</h4>
							<p className="book-info-details description">{book.description}</p>
						</div>
						<div className="details-btns-container">
							<Link to={`/edit/${book.book_id}`}>
								<button className="details-btns">Edit</button>
							</Link>
							<button
								className="details-btns"
								onClick={() => this.handleDelete(+book.book_id, book.title)}
							>
								Delete
							</button>
							{book.in_stock ? (
								<button className="details-btns" onClick={() => this.addToCart(book.book_id)}>
									+ Add to Cart
								</button>
							) : null}
						</div>
					</div>
				);
			});

		return (
			<div className="details-main">
				<Nav />
				<div className="details-tan">
					<h1 className="details-title">Details</h1>
					<button className="details-back-btn" onClick={() => this.props.history.goBack()}>
						Back
					</button>
					<div className="details-book-container">{selectedBook}</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		books: state.books
	};
};
export default connect(mapStateToProps, { getBooks, booksInCart })(Details);
