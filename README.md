# AgroChat
Protótipo de aplicação de chatbot que auxilia agricultores com informações sobre agrocomputação, práticas agrícolas e tecnologias emergentes.
O projeto visa tornar a tecnologia acessível e fácil de usar para todos os profissionais do campo.

## Tecnologias Utilizadas

- **Frontend**: React
- **Backend**: Node.js, Express
- **API**: Google Gemini AI (ou outra API de sua escolha)
- **Estilização**: CSS
- **Gerenciamento de Pacotes**: npm

## Instalação

Para instalar e executar o projeto localmente, siga os passos abaixo:

### 1. Clone o Repositório
```
git clone https://github.com/cesajr/agro-chatbot.git
cd agrofacil
```
## Estrutura do Projeto
```
/meu-chatbot
|-- /client              // Front-end React
|   |-- /public
|   |   |-- index.html   // Arquivo HTML principal para a aplicação React
|   |-- /src
|   |   |-- App.js       // Componente principal do React
|   |   |-- index.js     // Ponto de entrada do React
|   |   |-- style.css     // Estilos específicos do React
|-- /server              // Back-end Node.js
|   |-- server.js        // Arquivo principal do servidor Express
|-- package.json          // Arquivo de configuração do projeto Node.js, contendo dependências
|-- package-lock.json     // Arquivo gerado automaticamente que registra as versões exatas das dependências instaladas
|-- /lib                 // Pasta para módulos adicionais (se você tiver)
|   |-- config.js        // Configurações, como a chave da API
|   |-- gemini.js        // Módulo para interagir com a API do Gemini AI
|-- .env                 // Arquivo para variáveis de ambiente, como a chave da API (não deve ser versionado)
```

## Passo 1: Configuração do Back-End

### 1.1. Instalação do Node.js
Verifique se o Node.js e o npm (Node Package Manager) estão instalados em sua máquina.
Você pode verificar isso nos terminais do sistema operacional, git ou IDE com os seguintes comandos:
```
node --version
npm --version
```
Se não estiverem instalados, baixe e instale a versão recomendada em nodejs.org.

1.2. Criar a Estrutura do Projeto
Crie uma nova pasta para o projeto:
```
mkdir meu-chatbot
cd meu-chatbot
```
Inicie um novo projeto Node.js:
```
npm init -y
```
1.3. Instalação das Dependências do Back End
Instale as dependências necessárias:
```
npm install express cors dotenv axios express-rate-limit
```
1.4. Criar o Servidor Express
Crie um arquivo chamado server.js na raiz do projeto e adicione o seguinte código:
```
const express = require("express"); // Importa o Express para criar o servidor
const cors = require("cors");       // Importa o CORS para permitir requisições de diferentes origens
const rateLimit = require("express-rate-limit"); // Importa o middleware de limitação de taxa
require("dotenv").config();          // Carrega variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando a variável de ambiente ou 3000 como padrão

app.use(cors());                     // Habilita CORS para todas as rotas
app.use(express.json());             // Permite que o Express entenda requisições JSON

// Limitação de taxa (5 requisições por minuto)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,         // Janela de tempo de 1 minuto
    max: 5,                          // Limita cada IP a 5 requisições por janela
    message: "Muitas requisições feitas em um curto período. Tente novamente mais tarde." // Mensagem de erro personalizada
});
app.use(limiter);                   // Aplica a limitação de taxa a todas as rotas

// Rota básica para teste
app.get("/", (req, res) => {
    res.send("Servidor funcionando!"); // Responde com uma mensagem simples ao acessar a raiz
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Exibe mensagem no console quando o servidor está ativo
});
```
1.5. Testar o Back-End
Inicie o servidor:
```
node server.js
```
Acesse http://localhost:3000 no seu navegador para verificar se o servidor está funcionando.

