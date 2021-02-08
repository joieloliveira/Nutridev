import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home/Home'
import AddCard from './pages/addcard/AddCard'
import AddAlimento from './pages/addalimento/AddAlimento'

export default props => 
<BrowserRouter>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/addcard' component={AddCard} />
        <Route path='/addalimento' component={AddAlimento} />
        <Redirect from='*' to='/' />
    </Switch>
</BrowserRouter>