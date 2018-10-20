import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import logo from './../assets/tan-logo.svg';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
	}
	logout = () => {
		axios.post('/api/auth/logout').then((res) => {
			if (res) {
				this.setState({ redirect: true });
				console.log('you are logged out');
			}
		});
	};
	render() {
		const { redirect } = this.state;

		if (redirect) {
			return <Redirect to="/" />;
		}
		return (
			<div className="nav-main">
				<Navbar>
					<NavbarBrand href="/browse">
						<img className="nav-logo" src={logo} alt="logo" />
					</NavbarBrand>
					<NavItem>
						<NavLink href="/browse">
							<h2>Browse</h2>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/cart">
							<h2>Cart</h2>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/bookshelf">
							<h2>My Shelf</h2>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<button onClick={this.logout}>
								<h6>Logout</h6>
							</button>
						</NavLink>
					</NavItem>
				</Navbar>
			</div>
		);
	}
}

export default connect(null, {})(NavBar);
