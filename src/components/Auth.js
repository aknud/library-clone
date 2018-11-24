import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Jumbotron } from 'reactstrap';
import axios from 'axios';
import { getUserData, getBooks } from './../ducks/reducer';
import book from './../assets/maroon-logo.svg';

export class Auth extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			redirect: false
		};
	}
	componentDidMount = () => {
		axios
			.get('/api/allBooks')
			.then((res) => {
				this.props.getBooks(res.data);
				console.log('auth books ran');
			})
			.catch((err) => console.log("You've got an error", err));
		//delete this if statement when done with development
		// if (this.props.user) {
		// 	axios
		// 		.get('/api/checkForBypass')
		// 		.then((res) => {
		// 			this.props.getUserData(res.data);
		// 			this.setState({ redirect: true });
		// 		})
		// 		.catch((err) => console.log("You've got an error", err));
		// }
	};
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	registerClick = () => {
		const { username, password } = this.state;
		console.log(username, password)
		axios
			.post('/api/auth/register', { username, password })
			.then((res) => {
				this.props.getUserData(res.data);
				this.setState({ redirect: true });
			})
			.catch((err) => console.log('Something wrong in frontend', err));
	};
	loginClick = () => {
			const { username, password } = this.state;
			console.log(username, password)
			axios
				.post('/api/auth/login', { username, password })
				.then((res) => {
					this.props.getUserData(res.data);
					this.setState({ redirect: true });
				})
				.catch((err) => console.log('Something wrong in frontend', err));
	};
	clearState = () => {
		this.setState({ username: '', password: '' });
	};
	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/browse" />;
		}
		return (
			<div className="av-main">
				<Jumbotron className="jumbo-div">
					<div className="av-tan">
						<img className="av-book" src={book} alt="book" />
						<h1>Book Exchange</h1>
						<div className="av-black">
							<div className="login-username">
								<label className="av-label">Username</label>
								<input
									className="av-inputs"
									type="text"
									name="username"
									onChange={this.handleInput}
									value={this.state.username}
								/>
							</div>
							<div className="login-password">
								<label className="av-label">Password</label>
								<input
									className="av-inputs"
									type="password"
									name="password"
									onChange={this.handleInput}
									value={this.state.password}
								/>
							</div>
							<div>
								<button className="btn" onClick={this.registerClick}>
									Register
								</button>
								<button className="btn" onClick={this.loginClick}>
									Login
								</button>
							</div>
						</div>
					</div>
				</Jumbotron>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { getUserData, getBooks })(Auth);
