# Node.js Web Developer :green_book:

Anotações das atividades do Bootcamp. :pencil2::books:

- [x] [Criando um repositório para seus projetos inovadores](#criando-um-repositório-para-seus-projetos-inovadores)

- [x] [Introdução ao Node.js com Express](#introdução-ao-nodejs-com-express)

- [ ] [Arquitetura de Sistemas Avançado](#arquitetura-de-sistemas-avançado)

- [x] [Arquitetura interna no Node e filas](#arquitetura-interna-no-node-e-filas)

- [x] [Tarefas em background utilizando Node.js e Redis](#tarefas-em-background-utilizando-nodejs-e-redis)

- [ ] [Construindo sexy APIs usando arquitetura serverless](#construindo-sexy-apis-usando-arquitetura-serverless)

- [x] [Introdução ao domain driven design e padrões de arquitetura](#introdução-ao-domain-driven-design-e-padrões-de-arquitetura)

- [ ] [Desenvolvimento back-end com Node.js](#desenvolvimento-back-end-com-nodejs)

- [ ] [Construindo um ChatbotFit no Telegram com Javascript e NodeJs](#construindo-um-chatbotfit-no-telegram-com-javascript-e-nodejs)

  

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

**O que é uma CLI?** Ferramenta que disponibiliza uma interace de linha de comando para executar tarefas no terminal. Normalmente são criadas atraves de Shell Script.

**GUI x CLI**

cp *.js ~/Documents/Folder

Por que criar uma CLI em NodeJs? Facilidade distribuição.

Ferramentas: npm; yarn

Atividade Prática: Criar api pra procurar files

```js
#!/usr/bin/env node
const fs = require('fs')
const { join } = require('path')

const fileName = process.argv.splice(2, process.argv.length -1).join()

function searchFiles(filter, startPath = '.') {
    const files = fs.readdirSync(startPath)

    files.map(filePath => {
        const fullFilePath = join(startPath, filePath);
        const statFilePath = fs.lstatSync(fullFilePath);
    
        if (statFilePath.isDirectory()) {
            return searchFiles(filter, fullFilePath)
        }

        if (fullFilePath.indexOf(filter) !== -1) {
            console.log(fullFilePath)
        }
    })
}

searchFiles(fileName)
```



Link simbólico

```shell
npm link
```

```shell
search-files .json
```

Pacotes publicados

npmjs.com

Na raiz do projeto

```shell
npm adduser
```

Publicando no site npm

```shell
npm publish
```

- Aprenda a trabalhar com Commander.js

**O que é o Commander.js?**

Ferramenta completa para criação de CLIs em Node.js. Definição de comandos, parâmetro de opções e execução de ações. Descrição para cada comando e menu de ajuda com exemplos de uso.

*Atividade Prática*

Criar uma ferramenta que mostra o clima atual de uma cidade pelo nome. Utilizando a API do ClimaTempo

Fazer login em https://advisor.climatempo.com.br/

cli.js

```js
import program from 'commander'
import { version } from '../package.json'
import getForecast from './main'
import { saveApiToken } from './utils/apiToken'

export function init(args) {
    
    program
        .version(version, '-v, --version', 'Mostra a versão da ferramenta')
        .option('-t --token [token]', 'Advisor ClimaTempo API token')
        .arguments('<cityName...>')
        .description('Mostra o clima de uma cidade em tempo real')
        .action(async (cityName) => {
            if (program.token) {
                await saveApiToken(program.token)
            }
            getForecast(cityName.join(' '))
        })
        .on('--help', () => {
            console.log()
            console.log('Exemplos:')
            console.log('$ clima porto alegre')
            console.log('$ clima são paulo')
        })

    program.parse(args)
}
```

Commander github

https://github.com/tj/commander.js/

- Certifique seu conhecimento
  - Grunt, Gulp e Webpack são exemplos de:
    - CLIs em Node.
  - O que é uma CLI?
    - Interface de linha de comando para executar tarefas no terminal.
  - Em relação ao Commander.js: 
    I - É executado no cliente.
    II - Ajuda no desenvolvimento de CLIs.
    III - Permite adicionar uma descrição para cada comando disponível.
    - II e III estão corretas.
  - Qual o comando usado para publicar uma CLI no NPM?
    - npm publish
  - Qual é o comando usado para publicar sua CLI no NPM?
    - npm publish
  - Qual o comando NPM para instalar a CLI localmente para testes?
    - npm link
  - No arquivo package.json, em qual campo é informado o nome do comando que será usado pela CLI?
    - bin
  - Como adicionar parâmetros em um comando no terminal?
    - $ comando --nome-parametro valor
  - Em relação às CLIs: 
    I - Podem ser distribuídas facilmente.
    II - Só funcionam em ambientes Unix.
    III - Podem ser instaladas globalmente no sistema operacional.
    - I e III estão corretas.
  - Qual opção é usada para adicionar um comando no Commander.js?
    - .command(‘...’)

**Criação de templates com Pug**

- Como usar o Pug em projetos

O que é o Pug? É uma template engine de alta performance, com JS e Node.js e Browsers. Conhecido anteriormente como Jade

https://pugjs.org

*Prós*

> Escrever mais HTML com menos código
>
> Código parecido com parágrafos
>
> Não há fechamentos de tags
>
> Escrever js no pug

*Contras*

> Espaços em brancos importam. Mínimo erro de indentação pode trazer grandes problemas
>
> Não é possível usar codigo HTML de qualquer lugar

*Atividade Prática*

```shell
npm start
npm run build
```

- Integrando Pug com Express

> Uma template engine possibilita o uso de arquivos de template estático na sua aplicação.
>
> Em tempo de execução, variáveis dentro desse template podem ser substituídas por valores reais.
>
> Transforma o template em HTML e manda para o client
>
> Facilita o desenvolvimento de páginas HTML dinâmicas usando conteúdo estático.

index.js

```js
import express from 'express'
import posts from './data/posts.json'

const app = express()
const port = 3000

app.set('views', './src/templates')
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.render('index', {
        message: 'Bem vindo ao site que usa o Pug com Express!'
    })
})

app.get('/sobre', (req, res) => res.render('sobre'))
app.get('/contato', (req, res) => res.render('contato'))
app.get('/posts', (req, res) => res.render('posts', {
    posts
}))

app.listen(port, () => console.log(`App rodando na porta ${port}...`))

```

layout.pug

```pug
- var siteName = 'Meu template com Pug'

doctype html
html.h-100(lang='pt-br')
    
    head
        meta(charset='utf-8')
        meta(name="viewport" content="width=device-width, initial-scale=1")
        link(href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css", rel="stylesheet", integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T", crossorigin="anonymous")
        style.
            main > .container {
                padding: 60px 15px 0;
            }

            .footer {
                background-color: #f5f5f5;
            }

            .footer > .container {
                padding-right: 15px;
                padding-left: 15px;
            }

        block head
            title #{siteName} - #{title}

    body.d-flex.flex-column.h-100
        header    
            nav.navbar.navbar-expand-md.navbar-dark.fixed-top.bg-dark
                a.navbar-brand(href='/') #{siteName}
                #navbarCollapse.collapse.navbar-collapse
                    ul.navbar-nav.mr-auto
                        li.nav-item
                            a.nav-link(href='/') Início
                        li.nav-item
                            a.nav-link(href='/sobre') Sobre
                        li.nav-item
                            a.nav-link(href='/posts') Posts
                        li.nav-item
                            a.nav-link(href='/contato') Contato

        main.flex-shrink-0(role="main")
            block content
        
        include footer
```

Iniciar a aplicação

```shell
npm start
```

- Certifique seu conhecimento

  - A integração do Pug com o Express permite que:

    - Substituir, em tempo de execução, variáveis dentro dos templates por valores reais.

  - Leia as sentenças e assinale a alternativa correta sobre algumas das vantagens em relação ao uso do Pug.
    I - Não é necessário o fechamento das tags.
    II - É possível mesclar código HTML com Pug.
    III - Usar JavaScript dentro de um template Pug.

    - I e III estão corretas.

  - Qual o resultado do seguinte comando usando a CLI do Pug:

    	pug templates/*.pug --pretty --out ./build

    - Transforma todos os arquivos da pasta “templates” com a extensão .pug em HTML e salva os arquivos HTML na pasta “build” com indentação.

  - Veja as sentenças abaixo e assinale a alternativa correta. São desvantagens em relação ao uso do Pug:
    I - Escrever menos HTML com mais código.
    II - Não é possível usar código HTML em um template Pug.
    III - Sua performance é baixa, o que torna a aplicação mais lenta.

    - Apenas II está correta.

  - Fazendo a integração com o Pug, o Express é capaz de?

    - Transformar o template Pug em HTML e mandar para o client.

  - Qual trecho de código é usado para informar a pasta dos templates do Pug ao Express?

    - app.set('views', './templates')

  - Qual função é usada em uma rota no Express para renderizar um template Pug?

    - res.render()

  - O seguinte código Pug irá gerar qual saída em HTML:

    h1.header.title Minha Página

    - `<h1 class=”header title”>Minha Página</h1>`

  - O que é o Pug?

    - É uma template engine de alta performance implementado com JavaScript

  - Anteriormente o Pug era conhecido como:

    - Jade.

    ​	

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

Criando o projeto

Redis pelo docker

```shell
systemctl start docker
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Iniciar a aplicação

```shell
yarn init -y

yarn add express nodemailer dotenv
yarn add nodemon sucrase -D
```

Criar arquivo nodemon.json na raiz do projeto

```json
{
    "execMap": {
        "js": "sucrase-node"
    }
}
```

package.json

```json
{
  "name": "tarefas-redis-background-redis",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/rogerlog/tarefas-redis-background-redis.git",
  "author": "Roger <logroger@gmail.com>",
  "license": "MIT",
  "scripts": {
    "start": "nodemon src/server.js"
  },
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "nodemailer": "^6.4.17"
  },
  "devDependencies": {
    "nodemon": "^2.0.7",
    "sucrase": "^3.17.1"
  }
}
```

Criar src/server.js

```js
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log(`Server running on the ${process.env.PORT}`)
});
```

Variáveis de ambiente .env

```env
PORT=8080
```

Testando a aplicação

```shell
yarn start
```

Criando pasta src/app/controllers/UserController.js

```js
export default {
    async StorageEvent(req, res) {
        const {name, email} = req.body;

        const user = {
            name,
            email, password: '123'
        };

        return res.json(user);
    }
}
```

Adicionando a biblioteca `password-generator`

```shell
yarn add password-generator
```

Criação do arquivo /src/app/lib/Mail.js

Ferramenta para envio de email

mailtrap.io

Arquivo UserController.js

```js
import passwordGenerator from 'password-generator';
import Mail from '../lib/Mail';

export default {
    async StorageEvent(req, res) {
        const {name, email} = req.body;

        const user = {
            name,
            email, 
            password: passwordGenerator(15, false)
        };

        await Mail.sendMail({
            from: 'ROGER <rogerlog@id.uff.br>',
            to: `${name} <${email}>`,
            subject: 'Cadastro de Usuário',
            html: `Olá, ${name}, bem-vindo!`
        })

        return res.json(user);
    }
}
```

No postman enviar POST

http://localhost:8080/users

```json
{
    "name": "Roger",
    "email": "logroger@gmail.com"
}
```

Criar fila no Redis

Bull

```shell
yarn add bull
yarn add bull-board
```

Monitorar falhas

https://sentry.io/welcome/



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

Referências

- https://medium.com/@gabriel_faraday



#### Arquitetura de Software

> Arquitetura define Estrutura
>
> Arquitetura define Comportamento
>
> Necessidades do StakeHolders
>
> Influenciada pelo Ambiente
>
> Influencia a estrutura do time.
>
> Custo, manutenibilidade, performance, estabilidade.

<u>Desgin de Softwate</u>

Atividades transformação da necessidade de negócio em software funcionamento

Estilos Arquiteturais

> - Camadas
> - Microserviços
> - Pipes and Filters
> - Plugins
> - Client/Server
> - etc.

Padrões Arquiteturais

> - MVC
> - CQRS
> - Event Sourcing
> - 3 camadas
> - Onion
> - Clean
> - Hexagonal
> - Etc.

#### Arquitetura DDD

*Não existe arquitetura DDD*

O que é DDD afinal?

Não é sobre arquitetura, é sobre design, é sobre como você aborda o neǵocio para criação do software. Aplicações complexas. Simples de enteder e muito dificil de aplicar.

DDD é sobre negócio, não é uma tecnologia, é o jeito como faz as coisas.

LIngagem Ambigua > Linguagem comum no ambiente que está trabalhando.

*Obs: Maintaining Model Integrity*

#### Camadas DDD? Padrões

Arquitetura em Camadas: Onion Architecture

- Jeffrey Palermo
- Dependencia de fora para dentro
- Não é indicada para pequenos websites.

Hexagonal Arquitecture: Alistai Cockburn

Clean Archietectur: robert C. Martin

#### Por que não simplificar?

API 🠖 Business 🠖 DATA ACCESS

API 🠖 **Business** 🠔 DATA ACCESS

#### Arquitetura Emergente

*Nps lugares onde os aspectos arquiteturaus são levadas a sério como imprescindíveis para o sucesso de qualquer projeto é cada vez mais consenso de que a maneira tradicional de arquitetar sistemas não está provendo todo o valor que deveria.*

Problemas do modelo tradicional

- Código inutil
- Over-engineering
- Código embaraçoso
- Complexidade de manutenção

#### Arquitetura Emergente vs Agile Manifesto

*Responder a mudanças mais que seguir um plano.*

> **Indivíduos e interações** mais que processos e ferramentas
> **Software em funcionamento** mais que documentação abrangente
> **Colaboração com o cliente** mais que negociação de contratos
> **Responder a mudanças** mais que seguir um plano

#### Arquitetura Emergente vs Agile Principles

- Mudanças nos requisitos são bem-vindas, mesmo tardialmente no desenvolvimento.
- Software funcionando é a medida primária de progresso.
- Simplicidade (a arte de maximizar a quantidade de trabalho não realizado) é essencial
- As melhores arquiteturas, requisitos e designs emergem de equipes auto-organizáveis.
- Contínua atenção à excelência técnica e bom design aumenta a agilidade.

#### Concluindo

- Arquitetura e Design de Software são coisas distintas
- DDD não é sobre arquitetura
- DDD é sobre negócio
- DDD é sobre design
- DDD não é fazer software em camadas
- Em um "mundo Ágil" trabalhar com Arquitetura Emergente faz muito mais sentido
- Arquitetura Emergente (assim como Agil) não é fazer de qualquer jeito
- Arquitetura Emergente (assim como Agil) não significa não ter um plano



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

