import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Books extends React.Component {
	render() {
		const { books, inStock, outStock, genre } = this.props;
		
		let display = books
			// eslint-disable-next-line
			.filter((item) => {
				if (!genre && inStock && outStock) {
					return true;
				}
				if (genre && inStock && outStock) {
					return item.genre === genre;
				}
				if (genre && inStock) {
					return item.genre === genre && item.in_stock;
				}
				if (inStock) {
					return item.in_stock;
				}
				if (outStock && genre) {
					return !item.in_stock && item.genre === genre;
				}
				if (outStock) {
					return !item.in_stock;
				}
			})
			.map((book) => {
				return (
					<div key={book.book_id} className="book-card">
							<picture >
								<img className="book-cover" src={book.image_url} alt={book.title} />
							</picture>
						<dl className="title-author">
							<h1>{book.title}</h1>
							<p>by</p> <h4>{book.author}</h4>
						</dl>
						<dl className="inStock-details">
							<h4>In Stock: <span>{book.in_stock ? 'Yes' : 'No'}</span></h4>
							<Link to={`/details/${book.book_id}`}>
								<button className="books-btn">Details</button>
							</Link>
						</dl>
					</div>
				);
			});
		return <div>{display}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		books: state.books,
		cart: state.cart
	};
};
export default connect(mapStateToProps, {})(Books);
