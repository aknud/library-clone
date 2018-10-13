import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Books from './Books';
import { getBooks } from './../ducks/reducer';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export class Browse extends Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount = () => {
		if (this.props.books.length === 0) {
			this.fetchBooks();
			console.log('fetchBook had to run');
		}
	};
	fetchBooks = () => {
		axios
			.get('/api/allBooks')
			.then((res) => {
				this.props.getBooks(res.data);
			})
			.catch((err) => console.log('fetchBooks has an error', err));
	};
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
		};
		return (
			<div>
				<Nav endSesh={this.logout} />
				<div>
					<h1>Browse Inventory</h1>
					<form action=""></form>
					<Form inline>
						<FormGroup check>
							<Label check>
								In Stock <Input type="checkbox"/>
								</Label>
								<Label>
								Out of Stock <Input type="checkbox"/>
							</Label>
						</FormGroup>
						<FormGroup>
							<Label >Genre</Label>
							<Input type="select" bsSize="sm" name="genre">
								<option>None</option>
								<option>Fantasy</option>
								<option>Mystery</option>
								<option>Childrens</option>
								<option>Sports</option>
								<option>Horror</option>
								<option>Romance</option>
								<option>Sci-Fi</option>
							</Input>
						</FormGroup>
					</Form>
				</div>
				<div className="book-container" style={style}>
					<Books />
				</div>
				<div>
					<Link to="/add">
						<button>+Add New Book</button>
					</Link>
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

export default connect(mapStateToProps, { getBooks })(Browse);
