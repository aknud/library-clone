import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import Books from './Books';
import { getBooks } from './../ducks/reducer';

export class Browse extends Component {
	constructor(){
		super();
		this.state = {}
	}
	componentDidMount = () => {
		if(this.props.books.length === 0){
			this.fetchBooks()
			console.log('fetchBook had to run')
		}
	};
	fetchBooks =()=> {
		axios.get('/api/allBooks').then((res) => {
				this.props.getBooks(res.data);
			}).catch(err => console.log('fetchBooks has an error', err));
	}
	logout = () => {
		axios.post('/api/auth/logout').then((response) => {
			if (response.data) {
				this.props.history.push('/');
			}
		});
	};

	render() {
		 const style = {
			height: '900px',
			width: '900px',
			background: 'tan'
		}
		return (
			<div>
				<Nav endSesh={this.logout} />
				<div>
					<h1>Browse Inventory</h1>
					<p>In Stock</p>
					<p>Out of Stock</p>
					<p>Genre</p>
				</div>
				<div className="book-container" style={style}>
					<Books />
				</div>
				<button>+Add New Book</button>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		books: state.books
	};
};

export default connect(mapStateToProps, { getBooks })(Browse);
