import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { getUserData, getBooks } from './../ducks/reducer';
import book from './../assets/maroon-logo.svg';
import swal from 'sweetalert';

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
			})
			.catch((err) => console.log("You've got an error", err));
		swal({
			title: 'Welcome to Books2Shelf',
			text: `This is still a work in progress so for optimum viewing pleasure, check it out on your mobile phone, otherwise, please excuse the things that aren't centered. Thanks for visiting!`
		});
	};
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	registerClick = () => {
		const { username, password } = this.state;
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
				<div className="av-tan">
					<img className="av-book" src={book} alt="book" />
					<h1 className="auth-title">Book Exchange</h1>
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
							<button className="av-btn" onClick={this.registerClick}>
								Register
							</button>
							<button className="av-btn" onClick={this.loginClick}>
								Login
							</button>
						</div>
					</div>
				</div>
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
