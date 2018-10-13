import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export class Details extends React.Component {
	render() {
		const size = {
			height: '115px',
			width: '100px'
		};
		let selectedBook = this.props.books
			.filter((book) => book.book_id === +this.props.match.params.id)
			.map((book) => {
				return (
					<div key={book.book_id}>
						<div>
							<picture>
								<img style={size} src={book.image_url} alt={book.title} />
							</picture>
							<h1>Title: {book.title}</h1>
							<h4>Author: {book.author}</h4>
							<h4>Genre: {book.genre}</h4>
							<h4>In Stock: {book.in_stock}</h4>
							<h4>Description:</h4>
							<p>{book.description}</p>
							<Link to={`/edit/${book.book_id}`}>
								<button>Edit</button>
							</Link>
							<button>Delete</button>
							<button>+ Add to Cart</button>
						</div>
					</div>
				);
			});

		return (
			<div>
				<Nav />
				<h1>Details</h1>
				<button onClick={() => this.props.history.goBack()}>Back</button>
				<div>{selectedBook}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		books: state.books
	};
};
export default connect(mapStateToProps, {})(Details);
