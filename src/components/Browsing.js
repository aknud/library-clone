import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from './Nav'


class Browsing extends Component {

    render(){
        return (
            <div>
                <Nav />
                <h1>Browse</h1>
            </div>
        )
    }
}

export default connect()(Browsing);