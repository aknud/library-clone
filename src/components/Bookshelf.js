import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';


export class Bookshelf extends React.Component {
    render(){
        return (
            <div>
                <Nav />
                <h1>This here be where you keep the books you be reading</h1>
            </div>
        )
    }

}
export default connect(null, {})(Bookshelf);