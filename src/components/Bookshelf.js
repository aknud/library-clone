import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';


export class Bookshelf extends React.Component {
    render(){
        return (
            <div>
                <Nav />
                <h1>My Shelf</h1>
            </div>
        )
    }

}
export default connect(null, {})(Bookshelf);