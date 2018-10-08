import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav';

class Browse extends Component {
	logout = () => {
		axios.post('/api/auth/logout').then((response) => {
			if(response.data){
				this.props.history.push('/');
			}
		});
	};
	render() {
		return (
			<div>
				<Nav endSesh={this.logout} />
				<div>
					<h1>Browse Inventory</h1>
					<p>In Stock</p>
					<p>Out of Stock</p>
					<p>Genre</p>
				</div>
				<div className="book-container" />
				<button>+Add New Book</button>
			</div>
		);
	}
}

export default connect()(Browse);
