import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';


export class Cart extends React.Component {
    render(){
        return (
            <div>
                <Nav />
                <h1>This here be where you see what's in yer cart</h1>
            </div>
        )
    }

}
export default connect(null, {})(Cart);