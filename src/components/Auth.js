import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Jumbotron } from 'reactstrap';
import axios from 'axios';
import { getUserData } from './../ducks/reducer';
import book from './../assets/maroon-logo.svg';

class Auth extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			redirect: false
		};
	}
	componentDidMount =()=>{
		console.log('redirect on load',this.state.redirect)
		if(this.props.user){
			this.setState({ redirect: true });
		}
	}
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
		if (!this.props.user) {
			const { username, password } = this.state;
			axios
				.post('/api/auth/login', { username, password })
				.then((res) => {
					this.props.getUserData(res.data);
					this.setState({ redirect: true });
					console.log('this.state.redirect on login',this.state.redirect);
				})
				.catch((err) => console.log('Something wrong in frontend', err));
		} else {
			console.log('this.state.redirect login',this.state.redirect)
			this.setState({ redirect: true });
		}
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

export default connect(null, { getUserData })(Auth);
