import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink} from 'reactstrap';
import logo from './../assets/tan-logo.svg';

function NavBar() {
	return (
		<div className="nav-main">
			<Nav>
				<img className="nav-logo" src={logo} alt="logo" />
				<Link to="/browse">
					<h2>Browse</h2>
				</Link>
				<Link to="/cart">
					<h2>Cart</h2>
				</Link>
				<Link to="/bookshelf">My Shelf</Link>
			</Nav>
		</div>
	);
}

export default connect()(NavBar);
