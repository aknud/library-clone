import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import { booksInCart, bookShelf } from './../ducks/reducer';
import axios from 'axios';

export class Bookshelf extends React.Component {
	componentDidMount = () => {
		axios.get('/api/shelf').then((res) => {
			this.props.bookShelf(res.data);
		})
		.catch((err) => console.log('Bookshelf has an error', err));
	}

	render() {
        console.log('shelf',this.props.shelf)
		const { shelf } = this.props;
		const size = {
			height: '115px',
			width: '100px'
		};
		let display = shelf.map((book) => {
			return (
				<div key={book.book_id} style={{ border: '1px solid red' }}>
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
					</div>
				</div>
			);
		});
		return (
			<div>
				<Nav />
				<h1>My Shelf</h1>
				<div>{display}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		shelf: state.shelf
	};
};
export default connect(mapStateToProps, { booksInCart, bookShelf })(Bookshelf);
