import React from 'react';
import { Link } from 'react-router-dom';

import './css/pure-min.css';
import './css/side-menu.css';

const App = ({ match }) => (

    <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
        </a>

        <div id="menu">
            <div className="pure-menu">
                <Link className="pure-menu-heading" to="#">Company</Link>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><Link to={`${match.url}/`} className="pure-menu-link">Home</Link></li>
                    <li className="pure-menu-item"><Link to={`${match.url}/autor`} className="pure-menu-link">Autor</Link></li>
                    <li className="pure-menu-item"><Link to={`${match.url}/livro`} className="pure-menu-link">Livro</Link></li>
                </ul>
            </div>
        </div>

        <div id="main">
            <div className="header">
                <h1>Bem vindo ao sistema</h1>
            </div>

            <div className="content" id="content">
            </div>        
        </div>
    </div>
);

export default App;
