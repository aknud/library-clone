import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import {getBooks, booksInCart} from './../ducks/reducer';

export class Details extends React.Component {
	constructor(){
		super();
		this.state = {
			inCart: false
		}
	}
	handleDelete =(id)=>{
		axios.delete(`/api/delete/${id}`).then(res =>{
			this.props.getBooks(res.data);
			this.props.history.push('/browse');
		}).catch((err) => console.log('handleDelete has an error', err));
	}
	addToCart = (id) => {
		axios.post(`/api/addToCart/${id}`).then(res => {
			this.props.booksInCart(res.data)
		})
	}
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
							<h4>In Stock: {book.in_stock ? 'Yes' : 'No'}</h4>
							<h4>Description:</h4>
							<p>{book.description}</p>
							<Link to={`/edit/${book.book_id}`}>
								<button>Edit</button>
							</Link>
							<button onClick={()=>this.handleDelete(+book.book_id)}>Delete</button>
							{book.in_stock ? <button onClick={()=>this.addToCart(book.book_id)}>+ Add to Cart</button> : null}
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
export default connect(mapStateToProps, {getBooks, booksInCart})(Details);
