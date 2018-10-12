import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class Books extends React.Component {
	render() {
		const size = {
			height: '115px',
			width: '100px'
		};
		const card = {
			width: '700px',
			height: '300px',
			background: 'white',
			border: '2px solid black'
        };
        console.log('this.props.books',this.props.books)
		let display = this.props.books.map((book) => {
			return (
				<div key={book.book_id}>
					<div style={card}>
						<picture>
							<img style={size} src={book.image_url} alt={book.title} />
						</picture>
						<h1>{book.title}</h1>
						by <h4>{book.author}</h4>
                        In Stock: {book.in_stock}
                        <Link to={`/details/${book.book_id}`} ><button>Details</button></Link>
					</div>
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
