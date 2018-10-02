import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Jumbotron} from 'reactstrap';
import axios from 'axios';
import { getUserData } from './../ducks/reducer';
import book from './../assets/maroon-logo.svg';

class Auth extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
	}
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleClick = () => {
		const { username, password } = this.state;
		axios
			.post('/api/auth/register', { username, password })
			.then((res) => {
				this.props.getUserData(res.data);
				console.log('response', res.data);
			})
			.catch((err) => console.log('Something wrong in frontend', err));
	};
	clearState = () => {
		this.setState({ username: '', password: '' });
	};
	render() {
		console.log(this.state);
		return (
			<div className="av-main">
				<Jumbotron className="jumbo-div">
					<div className="av-tan">
						<img className="av-book" src={book} alt="book" />
						<h1>Book Exchange</h1>
						<div className="av-black">
							<div className="login-username">
								<label>Username</label>
								<input
									type="text"
									name="username"
									onChange={this.handleInput}
									value={this.state.username}
								/>
							</div>
							<div className="login-password">
								<label>Password</label>
								<input
									type="password"
									name="password"
									onChange={this.handleInput}
									value={this.state.password}
								/>
							</div>
							<div>
								<button className="btn" onClick={this.handleClick}>
									Register
								</button>
								<button className="btn">Login</button>
							</div>
						</div>
					</div>
				</Jumbotron>
			</div>
		);
	}
}

export default connect(null, { getUserData })(Auth);
