import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';

import App from './App';
import AutorBox from './autor/Autor';
import Home from './components/home';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    (<Router >
        <App>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/autor' component={AutorBox} />
                <Route path='/livro' />
            </Switch>
        </App>
    </Router>),
    document.getElementById('root')
);
registerServiceWorker();
