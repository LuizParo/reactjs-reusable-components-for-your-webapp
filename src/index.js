import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';

import App from './App';
import AutorBox from './autor/Autor';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    (<BrowserRouter >
        <div>
            <Switch>
                <Route path='/' component={App} />
                <Route path='/autor' component={AutorBox} />
            </Switch>
        </div>
    </BrowserRouter>),
    document.getElementById('root')
);
registerServiceWorker();
