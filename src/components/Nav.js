import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {clearCart} from './../ducks/reducer';
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
					<NavItem>
						<Link to="/browse">
							<h2>Browse</h2>
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/cart">
							<h2>Cart</h2>
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/bookshelf">
							<h2>My Shelf</h2>
						</Link>
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

export default connect(null, {clearCart})(NavBar);
