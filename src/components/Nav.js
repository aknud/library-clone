import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import logo from './../assets/tan-logo.svg';

function NavBar(props) {
	
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
						<NavLink >
							<button onClick={props.endSesh}><h6>Logout</h6></button>
						</NavLink>
					</NavItem>
				</Navbar>
			</div>
		);
}

export default connect()(NavBar);
