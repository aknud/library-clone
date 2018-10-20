import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Books extends React.Component {
	render() {
		console.log('outStock in books', this.props);
		const {books, inStock, outStock, genre} = this.props;
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
			.filter((item) => {
				if(genre){
					return item.genre === genre;
				}
				if(inStock){
					return item.in_stock === true
				}
				if(outStock){
					return item.in_stock === false
				}
				if(!genre){
					return true;
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
		books: state.books
	};
};
export default connect(mapStateToProps, {})(Books);
