import PubSub from 'pubsub-js';

export const TOPIC_ERROS_VALIDACAO = 'erro-validacao';

export default class TratadorDeErros {

    publicaErros(resp) {
        resp.errors.forEach(erro => PubSub.publish(TOPIC_ERROS_VALIDACAO, erro));
    }
}