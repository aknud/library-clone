import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';


export class Cart extends React.Component {
    render(){
        return (
            <div>
                <Nav />
                <h1>My Cart</h1>
            </div>
        )
    }

}
export default connect(null, {})(Cart);