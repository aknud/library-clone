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
		this.state = {
			inStock: true,
			outStock: true,
			genre: false
		};
	}
	componentDidMount = () => {
		if (this.props.books.length === 0) {
			axios
				.get('/api/allBooks')
				.then((res) => {
					this.props.getBooks(res.data);
					console.log('fetchBook had to run');
				})
				.catch((err) => console.log('fetchBooks has an error', err));
		}
	};
	handleChange = (e) => {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.setState({ [e.target.name]: value });
	};

	render() {
		return (
			<div className="browse-main">
				<Nav />
				<div className="tan-container">
					<div className="options">
						<h1 className="title">Browse Inventory</h1>
						<Form inline>
							<FormGroup check className="checkboxes">
								<Label check>
									In Stock{' '}
									<Input
										type="checkbox"
										name="inStock"
										className="inStock"
										checked={this.state.inStock}
										onChange={this.handleChange}
									/>
								</Label>
								<Label>
									Out of Stock{' '}
									<Input
										type="checkbox"
										checked={this.state.outStock}
										name="outStock"
										className="outStock"
										onChange={this.handleChange}
									/>
								</Label>
							</FormGroup>
							<FormGroup className="genre-select">
								<Label>Genre</Label>
								<Input type="select" bsSize="sm" name="genre" onChange={this.handleChange}>
									<option value="">All</option>
									<option value="Fantasy">Fantasy</option>
									<option value="Mystery">Mystery</option>
									<option value="Childrens">Childrens</option>
									<option value="Sports">Sports</option>
									<option value="Horror">Horror</option>
									<option value="Romance">Romance</option>
									<option value="Sci-Fi">Sci-Fi</option>
								</Input>
							</FormGroup>
						</Form>
						<div>
							<Link to="/add">
								<button>+Add New Book</button>
							</Link>
						</div>
					</div>

					<div className="book-container">
						<Books {...this.state} />
					</div>
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
