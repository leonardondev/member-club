# App

Member Club.

## RFs (Requisitos funcionais)
_funcionalidades da aplicação (visão do usuário final)_

- [x] Deve ser possível buscar as informações dos clientes através de um ID;
- [x] Deve ser exibida na tela a imagem do(a) cliente;
- [x] Deve ser exibido na tela o nome do(a) cliente;
- [x] Deve ser exibido na tela o histórico de cortes com a quantidade, a data e a hora;
- [x] Deve ser exibido na tela um progresso com o número de cortes restantes para o prêmio;

## RNs (Regras de negócio)
_caminhos que cada requisito pode tomar (condições)_

- [x] Deve aparecer um alerta de erro em tela caso seja um ID inválido;
- [x] Deve ter um check no cartão fidelidade para cada corte de cabelo que o(a) cliente tiver;
- [] Deve aparecer na tela um modal de parabéns com a mensagem: “Parabéns! Seu próximo corte é gratuito!” caso o cliente tenha atingido os 10 cortes;

## RNFs (Requisitos não-funcionais)
_não partem do cliente (técnicos)_

- [x] Deve haver uma validação pra saber se é um ID válido e existente;
