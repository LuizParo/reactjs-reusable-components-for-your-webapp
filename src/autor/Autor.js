import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import ButtonCustomizado from '../components/button-customizado';
import InputCustomizado, { TOPIC_LIMPA_ERROS } from '../components/input-customizado';

import TratadorDeErros from '../utils/TratadorDeErros';

export const TOPIC_ATUALIZA_AUTORES = 'atualizaAutores';

class FormAutor extends Component {

    constructor() {
        super();

        this.state = {
            nome : '',
            email : '',
            senha : ''
        };

        this.enviaForm = this.enviaForm.bind(this);

        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    salvaAlteracao(nomeInput, event) {
        this.setState({ [nomeInput] : event.target.value });
    }

    handleSuccess(autores) {
        PubSub.publish(TOPIC_ATUALIZA_AUTORES, autores);
        this.setState({ nome : '', email : '', senha : '' });
    }

    handleError(resp) {
        if (resp.status === 400) {
            new TratadorDeErros().publicaErros(resp.responseJSON);
        }
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
            success : this.handleSuccess,
            error : this.handleError,
            beforeSend : function() {
                PubSub.publish(TOPIC_LIMPA_ERROS, {});
            }
        });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                    <InputCustomizado id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} />
                    <InputCustomizado id="email" type="email" name="email" label="Email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} />
                    <InputCustomizado d="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} />
                    
                    <ButtonCustomizado label="Gravar" />
                </form>
            </div>
        );
    }
}

class TableAutor extends Component {

    render() {
        return (
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
                            this.props.autores.map(autor => {
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
        );
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { autores : [] };
    }

    componentDidMount() {
        $.ajax({
            url : 'http://localhost:8080/api/autores',
            dataType : 'json',
            success : autores => this.setState({ autores })
        });

        PubSub.subscribe(TOPIC_ATUALIZA_AUTORES, (topico, autores) => this.setState({ autores }));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                    <FormAutor />
                    <TableAutor autores={this.state.autores} />
                </div>
            </div>
        );
    }
}