import React, { Component } from 'react';
import $ from 'jquery';

import ButtonCustomizado from './components/button-customizado';
import InputCustomizado from './components/input-customizado';

import './css/pure-min.css';
import './css/side-menu.css';


class App extends Component {

    constructor() {
        super();
        this.state = {
            nome : '',
            email : '',
            senha : '',
            autores : []
        };

        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }
    
    componentDidMount() {
        $.ajax({
            url : 'http://localhost:8080/api/autores',
            dataType : 'json',
            success : autores => this.setState({ autores })
        });
    }

    setNome(event) {
        this.setState({ nome : event.target.value });
    }

    setEmail(event) {
        this.setState({ email : event.target.value });
    }

    setSenha(event) {
        this.setState({ senha : event.target.value });
    }

    enviaForm(event) {
        event.preventDefault();

        let { nome, email, senha } = this.state;

        $.ajax({
            url : 'http://localhost:8080/api/autores',
            contentType : 'application/json',
            dataType : 'json',
            type : 'post',
            data : JSON.stringify({ nome, email, senha }),
            success : autores => this.setState({ autores }),
            error : error => console.error(error)
        });
    }

    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autor</h1>
                    </div>

                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                                <InputCustomizado id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setNome} />
                                <InputCustomizado id="email" type="email" name="email" label="Email" value={this.state.email} onChange={this.setEmail} />
                                <InputCustomizado d="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setSenha} />
                                
                                <ButtonCustomizado label="Gravar" />
                            </form>
                        </div>
                        <div>
                            <table className="pure-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.autores.map(autor => {
                                            return (
                                                <tr key={autor.id}>
                                                    <td>{autor.nome}</td>
                                                    <td>{autor.email}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table> 
                        </div>  
                    </div>        
                </div>
            </div>
        );
    }
}

export default App;
