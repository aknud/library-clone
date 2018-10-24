import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Books extends React.Component {
	render() {
		const { books, inStock, outStock, genre } = this.props;
		const size = {
			height: '115px',
			width: '100px'
		};
		const card = {
			width: '500px',
			height: '300px',
			background: 'white',
			border: '2px solid black'
		};
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
				if (outStock){
					return !item.in_stock
				}
			})
			.map((book) => {
				return (
					<div key={book.book_id}>
						<dl style={card}>
							<picture>
								<img style={size} src={book.image_url} alt={book.title} />
							</picture>
							<h1>{book.title}</h1>
							by <h4>{book.author}</h4>
							In Stock: {book.in_stock ? 'Yes' : 'No'}
							<Link to={`/details/${book.book_id}`}>
								<button>Details</button>
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
