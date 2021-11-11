import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import ShortLinkHandler from './pages/ShortLinkHandler'


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/:shortLink' exact component={ShortLinkHandler} />
        </Switch>
    )
}

export default Routes
