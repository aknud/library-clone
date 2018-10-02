import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import logo from './../../assets/tan-logo.svg';

function Nav(){
    return (
        <div className="nav-main">
            <img src={logo} alt="logo"/>
            <Link to='/browse'>Browse</Link>
            <Link to='/cart'>Cart</Link>
            <Link to='/bookshelf'>My Shelf</Link>
        </div>
    )
}

export default connect()(Nav);