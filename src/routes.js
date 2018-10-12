import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Browse from './components/Browse';
import Details from './components/Details';
import Cart from './components/Cart';
import Bookshelf from './components/Bookshelf';

export default (
    <Switch>
        <Route path='/browse' component={Browse} />
        <Route path='/details/:id' component={Details} />
        <Route path='/cart' component={Cart} />
        <Route path='/bookshelf' component={Bookshelf} />
        <Route path='/' component={Auth}/>
    </Switch>
)