import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';

class Browse extends Component {
	render() {
		return (
			<div>
				<Nav />
				<div>
					<h1>Browse Inventory</h1>
                    <p>In Stock</p>
                    <p>Out of Stock</p>
                    <p>Genre</p>
				</div>
                <div className="book-container"></div>
                <button>+Add New Book</button>
			</div>
		);
	}
}

export default connect()(Browse);
