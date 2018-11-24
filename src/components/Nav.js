import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from './../ducks/reducer';
import { Navbar, NavbarToggler, Collapse, NavbarBrand } from 'reactstrap';
import logo from './../assets/tan-logo.svg';

class NavBar extends React.Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
			collapsed: true
		};
	}
	toggleNavbar = () => {
		this.setState({ collapsed: !this.state.collapsed });
	};
	logout = () => {
		console.log('logged out');
		axios.post('/api/auth/logout').then((res) => {
			if (res) {
				this.props.clearCart();
				this.setState({ redirect: true });
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
					<NavbarToggler onClick={this.toggleNavbar} className="navbar-dark" />
					<Collapse isOpen={!this.state.collapsed} navbar>
							<Link to="/browse">
								<h2>Browse</h2>
							</Link>
							<Link to="/cart">
								<h2>Cart</h2>
							</Link>
							<Link to="/bookshelf">
								<h2>My Shelf</h2>
							</Link>
							<Link to="/" onClick={this.logout}>
								<button className="logout-button" >
									<h2>Logout</h2>
								</button>
							</Link>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default connect(null, { clearCart })(NavBar);
