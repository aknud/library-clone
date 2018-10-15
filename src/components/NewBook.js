import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import {updateBooks} from './../ducks/reducer';

export class NewBook extends React.Component {
    constructor(){
        super();
        this.state = {
            url: '',
            title: '',
            author: '',
            genre: '',
            description: '',
        }
    }
    handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
    };
    handleSubmit = (e) => {
		e.preventDefault();
		const { url, title, author, genre, description } = this.state;
		let payload = { url, title, author, genre, description };
		axios
			.post('/api/addBook', payload)
			.then((res) => {
                console.log('res.data',res.data)
				this.props.updateBooks(res.data);
				this.props.history.push(`/browse`);
			})
			.catch((err) => console.log(err));
	};
	render() {
        console.log(this.state)
		return (
			<div>
				<Nav />
				<h1>Add a Book.</h1>
				<button onClick={() => this.props.history.goBack()}>Back</button>
				<div>
					<Form>
						<FormGroup row>
							<Label for="url" sm={1}>Url</Label>
							<Col sm={8}>
								<Input type="url" name="url" value={this.state.url} onChange={this.handleChange}/>
							</Col>
                            <Col sm={8}>
								<img src={this.state.url} alt=""/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="title" sm={1}>
								Title
							</Label>
							<Col sm={8}>
								<Input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="Author" sm={1}>
								Author
							</Label>
							<Col sm={8}>
								<Input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="genre" sm={1}>
								Genre
							</Label>
							<Col sm={8}>
								<Input type="select" bsSize="sm" name="genre" onChange={this.handleChange} >
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
								<Input type="textarea" name="description" value={this.state.description} onChange={this.handleChange} />
							</Col>
						</FormGroup>
						<FormGroup check row>
							<Col sm={{ size: 10, offset: 2 }}>
								<Button type="submit" onClick={this.handleSubmit}>+ Add Book to Inventory</Button>
							</Col>
						</FormGroup>
					</Form>
				</div>
			</div>
		);
	}
}
export default connect(null, {updateBooks})(NewBook);
