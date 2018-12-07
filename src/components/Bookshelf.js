import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import { getBooks, booksInCart, bookShelf } from './../ducks/reducer';
import axios from 'axios';

export class Bookshelf extends React.Component {
	componentDidMount = () => {
		axios
			.get('/api/shelf')
			.then((res) => {
				this.props.bookShelf(res.data);
			})
			.catch((err) => console.log('Bookshelf has an error', err));
	};
	returnBook = (shelf_id, book_id) => {
		axios
			.delete(`/api/returnBook/${shelf_id}`)
			.then((res) => {
				this.props.bookShelf(res.data);
				axios
					.get('/api/allBooks')
					.then((res) => {
						this.props.getBooks(res.data);
						console.log('getBooks updated');
					})
					.catch((err) => console.log('fetchBooks has an error', err));
			})
			.catch((err) => console.log('returnBook has an error', err));
	};

	render() {
		let display = this.props.shelf.map((book) => {
			return (
				<div key={book.book_id}>
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
								<button className="shelf-btns">Details</button>
							</Link>
							<button className="shelf-btns" onClick={() => this.returnBook(book.bs_id, book.book_id)}>
								Return Book
							</button>
						</dl>
					</div>
				</div>
			);
		});
		return (
			<div className="shelf-main">
				<Nav />
				<div className="shelf-tan">
					<h1 className="shelf-title">My Shelf</h1>
					<div>{display}</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		shelf: state.shelf
	};
};
export default connect(mapStateToProps, { getBooks, booksInCart, bookShelf })(Bookshelf);
