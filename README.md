# Node.js Web Developer :green_book:

Anotações das atividades do Bootcamp. :pencil2::books:

- [Criando um repositório para seus projetos inovadores](#criando-um-repositório-para-seus-projetos-inovadores)

- [Introdução ao Node.js com Express](#introdução-ao-nodejs-com-express)

- [Arquitetura de Sistemas Avançado](#arquitetura-de-sistemas-avançado)

- [Arquitetura interna no Node e filas](#arquitetura-interna-no-node-e-filas)

- [Tarefas em background utilizando Node.js e Redis](#tarefas-em-background-utilizando-nodejs-e-redis)

- [Construindo sexy APIs usando arquitetura serverless](#construindo-sexy-apis-usando-arquitetura-serverless)

- [Introdução ao domain driven design e padrões de arquitetura](#introdução-ao-domain-driven-design-e-padrões-de-arquitetura)

- [Desenvolvimento back-end com Node.js](#desenvolvimento-back-end-com-nodejs)

- [Construindo um ChatbotFit no Telegram com Javascript e NodeJs](#construindo-um-chatbotfit-no-telegram-com-javascript-e-nodejs)

  

<br><br><br><br><br>

------

## Criando um repositório para seus projetos inovadores

*Aprenda neste curso a criar desde uma conta no GitHub até o seu primeiro repositório na plataforma para compartilhar código com outros desenvolvedores e entrar no radar de recrutadores.*

:hourglass: 2 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*

- **Por que ter um repositório de projetos?**

No perfil do Github colocar as tecnologias que estou utilizando/aprendendo.

No linkedin: Titulo - FullStack Developer Angular e Java

Colocar cidade e email



Evoluir o projeto antes de colocar no github

Editor md

pandao.github.io/editor.md/en.html



<br><br><br>

------

## Introdução ao Node.js com Express 

*Nesse curso você vai conhecer um framework de JavaScript, o Express, que foi criado com a finalidade de criar aplicativos web usando o Node.js.*

:hourglass: 2 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*

**Introdução ao Node.js com Express**

- Aprenda sobre os conceitos de Node.js e crie um Ambiente

<u>Origem do Node.js</u>

> > > > Criado em 2009 por Ryan Dahl
> > > >
> > > > Combina a máquina virutal JavaScript V8, Event Loop e a Libuv
> > > >
> > > > Usa o JavaScript como linguagem de programação
> > > >
> > > > É guado a eventos (Event Driven)

V8 + libuv = Node

<u>Características</u>

> > > > Event Loop (Loop de Eventos)
> > > >
> > > > Assincronicidade
> > > >
> > > > Processos de I/O não bloqueante
> > > >
> > > > Alta performance

<u>Event Loop</u>

Stack de processamento -> Fila de Tarefas -> Background Threads (CallBack)

<u>Instalando o NodeJs</u>

No Manjaro já veio instalado. [Mas entrar no site oficial do Node para instalar](https://nodejs.org/).

```shell
node -v
```

Depois de instalado, testar com um arquivo index.js de conteúdo:

```javascript
console.log("Node funcionando com sucesso!");
```

No terminal

```shell
node index.js
```

- Criando uma API com Express

<u>O que é o Express?</u>

> > > > É um Framework wbe minimalista e rápido para Node.js
> > > >
> > > > Fornece uma estrutura e conjunto de recursos robustos para aplicações Web e mobile
> > > >
> > > > Dispõe de métodos utilitários HTTP e middlewares para criar uma API rápida e segura

<u>Instalando o Express</u>

```shell
npm install express --save
```

Vai criar a pasta `node_modules`

Para o arquivo de configuração

```shell
npm init
```

Roda o comando de instalação novamente para incluí-lo na configuração

```shell
npm install express --save
```

Criado um arquivo index.js na raiz do projeto, temos:

```js
const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log('Api rodando na porta 3000'))
```

Rodando o arquivo index.js com express

```shell
node index.js
```

Para rodar no navegador web, acrescentar

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))
app.listen(port, () => console.log('Api rodando na porta 3000'))
```

```shell
node index.js
```

No navegador entrar em: http://localhost:3000

<br>

<u>Atividade Prática</u>

> > > Criar uma endpoitn para users:

>> > > Listar usuários (GET)
>> > >
>> > > Criar usuário (POST)
>> > >
>> > > Modificar usuário (PUT)
>> > >
>> > > Remover usuário (DELETE)



Criação do arquivo `/route/userRoutes.js` para rotas.

```js
const fs = require('fs')
const { join } = require('path')
const filePath = join(__dirname, 'users.json')
const getUsers = () => {
    const data = fs.existsSync(filePath) 
        ? fs.readFileSync(filePath)
        : []
    try {
        return JSON.parse(data)        
    } catch (error) {
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))
const userRoute = (app) => {
    app.route('/users/:id?')
        .get((rea,res) => {
            const users = getUsers()
            res.send({ users })
        })
        .post((req,res) => {
            const users = getUsers()
            users.push(req.body)
            saveUser(users)
            res.sendStatus(201)
        })
        .put((req,res) => {
            const users = getUsers()
            saveUser(users.map(user => {
                if(user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))
            res.sendStatus(200)
        })
        .delete((req, res) => {
            const users = getUsers()
            saveUser(users. filter(user => user.id !== req.params.id))
            res.sendStatus(200)
        })
}
module.exports = userRoute
```

Atualizando o arquivo `index.js`

```js
const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
userRoute(app)
app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))
app.listen(port, () => console.log('Api rodando na porta 3000'))
```

Utilizar o [Postman](https://www.postman.com/) para manipular os dados da api.

Código da api [AQUI](/Introducao%20ao%20Node%20com%20Express/node-express). 

- Certifique seu conhecimento
  - Em qual arquivo são registradas as informações e dependências de um projeto em Node.js?
    - package.json
  - Qual linguagem de programação é usada para desenvolver aplicações em Node.js?
    - JavaScript.
  - Qual é o nome da pasta padrão gerada pelo NPM para armazenar o código fonte das dependências instaladas no projeto?
    - node_modules
  - A assincronicidade no Node.js se dá ao fato de que:
    - Não é necessário esperar finalizar uma tarefa para iniciar outra.
  - São características do Event Loop: 
    I - Registro de callbacks.
    II - Execução de tarefas síncronas de maneira assíncrona usando a libuv.
    III - Usa o V8 do Chrome para executar tarefas bloqueantes.
    - I e II estão corretas.
  - Qual é o comando para iniciar um novo projeto em Node.js usando o NPM?
    - npm init
  - O que é o NPM?
    - Gerenciador de pacotes e dependências de um projeto em Node.js.
  - Quais destas afirmações estão corretas em relação ao Node.js? 
    I - Usa a JVM do Java.
    II - É JavaScript no servidor.
    III - Pode ser executado em várias plataformas como Linux, Windows e Mac OS.
    - As alternativas II e III estão corretas.
  - O que é o Express?
    - Framework web minimalista e rápido para Node.js.
  - Quais são os principais métodos HTTP suportados pelo Express?
    - GET, POST, PUT e DELETE.

**Desenvolvendo ferramentas de linhas de comando**

- Criando uma ferramenta com CLI
- Aprenda a trabalhar com Commander.js
- Certifique seu conhecimento







<br><br><br>

------

## Arquitetura de Sistemas Avançado

*Conheça sobre os conceitos da arquitetura de sistemas, aplicações em nuvem e operações em softwares.*

:hourglass: 3 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*



<br><br><br>

------

## Arquitetura interna no Node e filas

*Aprenda como funciona o event loop no Node, como são executados os códigos C++ via v8 do motor criado pela Google, como tudo isso está ligado diretamente ao tempo de resposta na API e o porquê de se utilizar fila.*

:hourglass: 1 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*

**Inicio**

> > Node roda em V8

> > JS -> My C++ program -> Machine Code

<br>

**Event Loop**

> V8 -> código C++ **(libuv)**

Worker -> Threads Virtuais

[DOCUMENTAÇÃO NODE](https://nodejs.org/dist/latest-v14.x/docs/api/)

CloudAMQP



<br><br><br>

------

## Tarefas em background utilizando Node.js e Redis

*Nesse Labs você deve desenvolver e entregar um projeto de “Cadastro de usuário e envio de e-mail de confirmação de cadastro como tarefa em background utilizando Node.js” ao qual você praticará e aplicará os conceitos de processamento assíncrono de tarefas utilizando Node.js e Redis. Demonstre toda sua capacidade criativa para transformar a base do projeto apresentada nesta sessão em um desenvolvimento inovador.*

:hourglass: 6 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*





<br><br><br>

------

## Construindo sexy APIs usando arquitetura serverless

*Nesse desafio você deve desenvolver e entregar um projeto de “APIs para Gestão de Produtos utilizando Node.js” ao qual você praticará e aplicará os conceitos de desenvolvimento de APIs e Arquitetura Serverless com Node.js. Demonstre toda sua capacidade criativa para transformar a base do projeto apresentada nesta sessão em um desenvolvimento inovador.*

:hourglass: 6 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*







<br><br><br>

------

## Introdução ao domain driven design e padrões de arquitetura

*Nesse curso você aprende os princípios básicos de DDD (Domain Driven Design ou em português desenvolvimento dirigido ao domínio) assim como a sua aplicabilidade e padrões de arquitetura de software.*

:hourglass: 2 horas	[⤴​](#nodejs-web-developer-green_book)

<br>

*Notas da aula*



<br><br><br>

------

## Desenvolvimento back-end com Node.js

*Aprenda como programar em back-end utilizando o Node, uma plataforma poderosa de aplicações que conecta o back ao front-end.*

:hourglass: 5 horas	[⤴](#nodejs-web-developer-green_book)

<br>

*Notas da aula*





<br><br><br>

------

## Construindo um ChatbotFit no Telegram com Javascript e NodeJs

*Nesse Labs você deve desenvolver e entregar um projeto de “Chatbot no Telegram com JavaScript e NodeJS” ao qual você praticará e aplicará os conceitos de integração e buscas de vídeos de exercícios físicos no YouTube utilizando uma plataforma de entendimento de linguagem natural chamada DialogFlow. Demonstre toda sua capacidade criativa para transformar a base do projeto apresentada nesta sessão em um desenvolvimento inovador.*

:hourglass: 6 horas	[⤴](#nodejs-web-developer-green_book)

<br>

*Notas da aula*

