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
```bash
git clone https://github.com/cesajr/agro-chatbot.git
cd agrofacil
```
## Estrutura do Projeto
```bash
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
```bash
node --version
npm --version
```
Se não estiverem instalados, baixe e instale a versão recomendada em nodejs.org.

1.2. Criar a Estrutura do Projeto
Crie uma nova pasta para o projeto:
```bash
mkdir chatbot
cd chatbot
```
Inicie um novo projeto Node.js:
```bash
npm init -y
```
1.3. Instalação das Dependências do Back End e API
Instale as dependências necessárias:
```bash
npm install express cors dotenv axios
```
1.3.1. Instale os pacotes necessários para trabalhar com variáveis de ambiente e o SDK do Gemini:
```bash
npm install @google/generative-ai
```
2. Configuração da Chave API (Variável de ambiente que deverá ser ignorada na hora de subir para o repositório no github):
Obter Chave de API
Acesse sua Google AI Platform.
Clique em "Obter chave de API" e copie sua chave.
Criar Arquivo `.env`
Na raiz do seu projeto, crie um arquivo chamado .env e adicione sua chave API:
```
API_KEY=YOUR_GEMINI_KEY
```
Substitua YOUR_GEMINI_KEY pela chave que você obteve.

3. Configuração do Projeto
Criar Estrutura de Pastas
Crie uma nova pasta chamada lib dentro da pasta do seu projeto:
```bash
mkdir lib
```
3.1. Criar Arquivo `config.js`
Dentro da pasta lib, crie um arquivo chamado `config.js` e adicione o seguinte código:
```javascript
// Importa a biblioteca dotenv para carregar variáveis de ambiente do arquivo .env
// Imports the dotenv library to load environment variables from the .env file
const dotenv = require("dotenv");

// Carrega as variáveis de ambiente do arquivo .env para process.env
// Loads environment variables from the .env file into process.env
dotenv.config();

// Define a chave da API Gemini a partir da variável de ambiente
// Sets the Gemini API key from the environment variable
const API_KEY = process.env.API_KEY;

// Exporta a chave da API para ser usada em outros módulos
// Exports the API key to be used in other modules
module.exports = { API_KEY };
```
3.1.2. Criar Arquivo `gemini.js`
Ainda na pasta lib, crie um arquivo chamado `gemini.js` para manipulação de texto:
```javascript
// Importa a biblioteca GoogleGenerativeAI para usar a API Gemini do Google
// Imports the GoogleGenerativeAI library to use Google's Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Importa a chave da API do arquivo de configuração config.js
// Imports the API key from the config.js configuration file
const { API_KEY } = require("./config");

// Inicializa uma nova instância da API Gemini usando a chave da API
// Initializes a new instance of the Gemini API using the API key
const googleAI = new GoogleGenerativeAI(API_KEY);

// Configurações para o modelo Gemini, ajustando parâmetros como temperatura, topP, e topK
// Configures Gemini model settings, adjusting parameters like temperature, topP, and topK
const geminiConfig = {
  temperature: 0.9,  // Define a temperatura para ajustar a aleatoriedade nas respostas // Sets temperature to adjust randomness in responses
  topP: 1,           // Define topP para priorizar tokens de alta probabilidade // Sets topP to prioritize high-probability tokens
  topK: 1,           // Define topK para limitar o número de tokens candidatos // Sets topK to limit the number of candidate tokens
  maxOutputTokens: 4096, // Define o número máximo de tokens na resposta // Sets the maximum number of tokens in the response
};

// Carrega o modelo generativo Gemini com as configurações definidas
// Loads the Gemini generative model with the specified settings
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",  // Especifica o modelo Gemini // Specifies the Gemini model
  geminiConfig,         // Aplica as configurações de geração de conteúdo // Applies content generation settings
});

// Função assíncrona para gerar uma resposta de texto a partir de um prompt
// Async function to generate a text response from a prompt
const generateText = async (prompt) => {
  try {
    // Envia o prompt para o modelo e obtém a resposta gerada
    // Sends the prompt to the model and retrieves the generated response
    const result = await geminiModel.generateContent(prompt);
    return result.response.text(); // Retorna o texto da resposta // Returns the response text
  } catch (error) {
    console.log("Erro na resposta", error); // Registra o erro no console // Logs error to the console
    throw error; // Lança o erro para ser tratado na chamada // Throws the error to be handled by the caller
  }
};

// Exporta a função generateText para uso em outros módulos
// Exports the generateText function for use in other modules
module.exports = { generateText };

```
4. Criar o Servidor Express
Crie um arquivo chamado `server.js` na raiz do projeto e adicione o seguinte código:
```javascript
// Importa o framework Express para criar o servidor
// Imports the Express framework to create the server
const express = require("express");

// Importa a função "generateText" da biblioteca local Gemini
// Imports the "generateText" function from the local Gemini library
const { generateText } = require("./lib/gemini");

// Importa o middleware body-parser para processar o corpo das requisições JSON
// Imports the body-parser middleware to process JSON request bodies
const bodyParser = require("body-parser");

// Importa o módulo CORS para permitir requisições de outros domínios
// Imports the CORS module to allow requests from other domains
const cors = require("cors");

// Importa o middleware de limitação de taxa para restringir o número de requisições
// Imports the rate-limit middleware to restrict the number of requests
const rateLimit = require("express-rate-limit");

// Cria uma instância do aplicativo Express
// Creates an instance of the Express application
const app = express();

// Define a porta do servidor (usa variável de ambiente ou porta 3000 por padrão)
// Sets the server port (uses environment variable or defaults to port 3000)
const PORT = process.env.PORT || 3000;

// Ativa o CORS para permitir requisições entre domínios
// Enables CORS to allow cross-domain requests
app.use(cors());

// Configura o body-parser para processar JSON no corpo das requisições
// Configures body-parser to process JSON in request bodies
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta 'public' (ex.: arquivos HTML, CSS)
// Serves static files from the 'public' folder (e.g., HTML, CSS files)
app.use(express.static('public'));

// Define uma limitação de taxa (exemplo: 5 requisições por minuto)
// Sets a rate limit (e.g., 5 requests per minute)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto // 1 minute
    max: 5, // Limite de 5 requisições por IP a cada minuto // Limits each IP to 5 requests per minute
    message: "Muitas requisições feitas em um curto período. Tente novamente mais tarde." // Mensagem de erro // Error message
});

// Aplica o limitador a todas as requisições para evitar uso excessivo
// Applies the rate limiter to all requests to prevent excessive usage
app.use(limiter);

// Define a rota POST para "/api/message", onde o chatbot processa as mensagens do usuário
// Sets up the POST route for "/api/message" where the chatbot processes user messages
app.post("/api/message", async (req, res) => {
    // Recebe e converte a mensagem do usuário para letras minúsculas
    // Receives and converts the user's message to lowercase
    const userMessage = req.body.message.toLowerCase();
    
    let responseText; // Inicializa uma variável para armazenar a resposta // Initializes a variable to store the response

    // Verifica se a mensagem do usuário contém palavras-chave específicas e responde com conteúdo pré-definido
    // Checks if the user's message contains specific keywords and responds with pre-defined content
    if (userMessage.includes("agricultura sustentável")) {
        responseText = "A agricultura sustentável é uma prática que busca atender às necessidades atuais sem comprometer as futuras gerações. Ela envolve técnicas que preservam o meio ambiente.";
    } else if (userMessage.includes("tecnologias emergentes")) {
        responseText = "As tecnologias emergentes em agrocomputação incluem uso de drones, sensores IoT e inteligência artificial para otimizar a produção agrícola.";
    } else if (userMessage.includes("dicas práticas")) {
        responseText = "Algumas dicas práticas para agricultores incluem: diversificação de culturas, rotação de culturas e uso eficiente da água.";
    } else {
        // Para outras mensagens, tenta gerar uma resposta usando a API Gemini AI
        // For other messages, tries to generate a response using the Gemini AI API
        try {
            responseText = await generateText(userMessage); // Gera resposta padrão // Generates default response
        } catch (error) {
            console.error("Erro ao gerar texto:", error); // Registra o erro no console // Logs error to the console
            // Retorna uma resposta de erro ao cliente
            // Sends an error response to the client
            return res.status(500).json({ error: "Desculpe, ocorreu um erro ao processar sua solicitação." });
        }
    }

    // Envia a resposta final ao cliente como JSON
    // Sends the final response to the client as JSON
    res.json({ reply: responseText });
});

// Inicia o servidor e exibe a mensagem no console indicando a porta usada
// Starts the server and logs a message to the console indicating the port in use
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Logs server port
});

```
4.1. Testar o Back-End
Inicie o servidor:
```bash
node server.js
```
Acesse `http://localhost:3000` no seu navegador para verificar se o servidor está funcionando.


