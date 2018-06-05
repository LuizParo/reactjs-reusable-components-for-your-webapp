import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { TOPIC_ERROS_VALIDACAO } from '../utils/TratadorDeErros';

export const TOPIC_LIMPA_ERROS = 'limpa-erros'

class InputCustomizado extends Component {

    constructor() {
        super();

        this.state = { mensagemErro : '' };
    }

    componentDidMount() {
        PubSub.subscribe(TOPIC_ERROS_VALIDACAO, (topico, erro) => {
            if (erro.field === this.props.name) {
                this.setState({ mensagemErro : erro.defaultMessage });
            }
        });

        PubSub.subscribe(TOPIC_LIMPA_ERROS, topico => {
            this.setState({ mensagemErro : '' });
        });
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name}
                       value={this.props.value} onChange={this.props.onChange} />

                <span className="error">{this.state.mensagemErro}</span>
            </div>
        );
    }
}

export default InputCustomizado;