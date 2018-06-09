import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import ButtonCustomizado from '../components/button-customizado';
import InputCustomizado, { TOPIC_LIMPA_ERROS } from '../components/input-customizado';

import TratadorDeErros from '../utils/TratadorDeErros';

export const TOPIC_ATUALIZA_LIVROS = 'atualizaLivros';

class FormLivro extends Component {

    constructor() {
        super();

        this.state = {
            titulo : '',
            preco : '',
            autorId : ''
        };

        this.enviaForm = this.enviaForm.bind(this);

        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    salvaAlteracao(nomeInput, event) {
        this.setState({ [nomeInput] : event.target.value });
    }

    handleSuccess(livros) {
        PubSub.publish(TOPIC_ATUALIZA_LIVROS, livros);
        this.setState({ titulo : '', preco : '', autorId : '' });
    }

    handleError(resp) {
        if (resp.status === 400) {
            new TratadorDeErros().publicaErros(resp.responseJSON);
        }
    }

    enviaForm(event) {
        event.preventDefault();

        let { titulo, preco, autorId } = this.state;

        $.ajax({
            url : 'http://localhost:8080/api/livros',
            contentType : 'application/json',
            dataType : 'json',
            type : 'post',
            data : JSON.stringify({ titulo, preco, autorId }),
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
                    <InputCustomizado id="titulo" type="text" name="titulo" label="Título" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this, 'titulo')} />
                    <InputCustomizado id="preco" type="number" name="preco" label="Preço" value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')} />
                    
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>

                        <select value={this.state.autorId} name="autorId" onChange={this.salvaAlteracao.bind(this, 'autorId')}>
                            <option value="">Seleciona um autor</option>
                            {
                                this.props.autores.map(autor => {
                                    return (
                                        <option key={autor.id} value={autor.id}>
                                            {autor.nome}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <span className="error"></span>
                    </div>

                    <ButtonCustomizado label="Gravar" />
                </form>
            </div>
        );
    }
}

class TableLivro extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.livros.map(livro => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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

class LivroBox extends Component {

    constructor() {
        super();
        this.state = {
            livros : [],
            autores : []
        };
    }

    componentDidMount() {
        $.ajax({
            url : 'http://localhost:8080/api/livros',
            dataType : 'json',
            success : livros => this.setState({ livros })
        });

        $.ajax({
            url : 'http://localhost:8080/api/autores',
            dataType : 'json',
            success : autores => this.setState({ autores })
        });

        PubSub.subscribe(TOPIC_ATUALIZA_LIVROS, (topico, livros) => this.setState({ livros }));
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormLivro autores={this.state.autores} />
                    <TableLivro livros={this.state.livros} />
                </div>
            </div>
        );
    }
}

export default LivroBox;