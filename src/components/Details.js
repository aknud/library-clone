import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';

export class Details extends React.Component {
    render(){
        return (
            <div>
                <Nav />
                <h1>This here be where you get the deets about the book yer interested in.</h1>
            </div>
        )
    }

}
export default connect(null, {})(Details);