import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { updateBooks } from './../ducks/reducer';

export class NewBook extends React.Component {
	constructor() {
		super();
		this.state = {
			image_url: '',
			title: '',
			author: '',
			genre: '',
			description: ''
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { image_url, title, author, genre, description } = this.state;
		let payload = { image_url, title, author, genre, description };
		axios
			.post('/api/addBook', payload)
			.then((res) => {
				this.props.updateBooks(res.data);
				this.props.history.push(`/browse`);
			})
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div className="edit-main">
				<Nav />
				<div className="edit-tan">
					<h1 className="edit-title">Add a Book</h1>
					<button className="edit-back-btn" onClick={() => this.props.history.goBack()}>
						Back
					</button>
					<Form className="edit-form">
						<FormGroup row>
							<Label for="image_url" sm={1}>
								Image Url
							</Label>
							<Col sm={8}>
								<Input
									type="url"
									name="image_url"
									className="edit-inputs"
									value={this.state.image_url}
									onChange={this.handleChange}
								/>
							</Col>
							<Col sm={8} className="edit-book-cover-container">
								<img src={this.state.image_url} alt={this.state.title} className="edit-book-cover" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="title" sm={1}>
								Title
							</Label>
							<Col sm={8}>
								<Input
									type="text"
									className="edit-inputs"
									name="title"
									value={this.state.title}
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="Author" sm={1}>
								Author
							</Label>
							<Col sm={8}>
								<Input
									type="text"
									name="author"
									className="edit-inputs"
									value={this.state.author}
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="genre" sm={1}>
								Genre
							</Label>
							<Col sm={8}>
								<Input
									type="select"
									bsSize="sm"
									name="genre"
									className="edit-inputs"
									onChange={this.handleChange}
								>
									<option value="">Select Genre</option>
									<option value="Fantasy">Fantasy</option>
									<option value="Mystery">Mystery</option>
									<option value="Childrens">Childrens</option>
									<option value="Sports">Sports</option>
									<option value="Horror">Horror</option>
									<option value="Romance">Romance</option>
									<option value="Sci-Fi">Sci-Fi</option>
								</Input>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="description" sm={2}>
								Description
							</Label>
							<Col sm={8}>
								<Input
									type="textarea"
									name="description"
									className="edit-inputs"
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={{ size: 10, offset: 2 }}>
								<Button type="submit" onClick={this.handleSubmit}>
									+ Add Book to Inventory
								</Button>
							</Col>
						</FormGroup>
					</Form>
				</div>
			</div>
		);
	}
}
export default connect(null, { updateBooks })(NewBook);
