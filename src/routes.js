import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Browse from './components/Browse';

export default (
    <Switch>
        <Route path='/browse' component={Browse} />
        <Route exact path='/' component={Auth}/>
    </Switch>
)