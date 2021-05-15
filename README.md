# Desafio Dot - Analista de Testes Automatizados
*Considerando um site de compras de varejo (americanas, pontofrio, extra entre outros), escolha um deles e crie alguns casos de teste considerando o cenário ‘carrinho de compras’. Em seguida, desenvolva os scrips de automação (na linguagem que preferir) dos casos de teste e disponibilize o link do seu github.*

## Sobre
**Site escolhido**: http://automationpractice.com/

**Tecnologias**: JavaScript e Cypress

**Requisitos**: 
Node.Js 14.17.0
Npm 6.14.13
Git  2.30.2

## Como executar?
O repositório com os testes estão configurados somente para rodar localmente no momento.
Para executá-los, basta clonar este repositório abrindo seu terminal, navegar até o diretório desejado e colar o comando:

    git clone https://github.com/gabrielbesen26/desafio-dot
Seguir do comando:

    npm install
Após a instalação das dependências, execute o comando:

    npm run cy:run:qa

## Considerações
Os testes:
*Clicar em adicionar uma quantidade deve atualizar os valores*
*Editar o campo quantidade deve atualizar os valores* 

Me deparei com um comportamento diferente em comparação aos testes manuais. Foi implementado a espera das requisições http, porém, mesmo assim o problema persistiu. Essa é uma situação onde eu alinharia com algum desenvolvedor para investigarmos o que pode estar acontecendo com o componente de edição da quantidade dos itens no carrinho. 

Qualquer dúvida estou a disposição.


