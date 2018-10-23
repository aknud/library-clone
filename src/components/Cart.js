import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';


export class Cart extends React.Component {
    render(){
        console.log('this.props.cartBooks',this.props.cart)
        let books = this.props.cart.map(book => {
            return (
                <div key={book.book_id} style={{border: "1px solid red"}}>
						<div>
							<picture>
								<img style={size} src={book.image_url} alt={book.title} />
							</picture>
							<h1>Title: {book.title}</h1>
							<h4>Author: {book.author}</h4>
							<h4>Genre: {book.genre}</h4>
							<h4>In Stock: {book.in_stock ? 'Yes' : 'No'}</h4>
							<h4>Description:</h4>
							<p>{book.description}</p>
						</div>
					</div>
            )
        })
        const size = {
			height: '115px',
			width: '100px'
		};
        return (
            <div>
                <Nav />
                <h1>My Cart</h1>
                <div>{books}</div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}
export default connect(mapStateToProps, {})(Cart);