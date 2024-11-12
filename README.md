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
git clone https://github.com/seuusuario/agrofacil.git
cd agrofacil

## Estrutura do Projeto
/meu-chatbot
|-- /client // Front-end React
| |-- /public
| | |-- index.html // Arquivo HTML principal para a aplicação React
| |-- /src
| | |-- App.js // Componente principal do React
| | |-- index.js // Ponto de entrada do React
| | |-- style.css // Estilos específicos do React
|-- /server // Back-end Node.js
| |-- server.js // Arquivo principal do servidor Express
|-- package.json // Arquivo de configuração do projeto Node.js, contendo dependências
|-- package-lock.json // Arquivo gerado automaticamente que registra as versões exatas das dependências instaladas
|-- .env // Arquivo para variáveis de ambiente, como a chave da API (não deve ser versionado)


## Passo 1: Configuração do Back-End

### 1.1. Instalação do Node.js

Certifique-se de que o Node.js e o npm (Node Package Manager) estão instalados em sua máquina. Você pode verificar isso nos terminais do sistema operacional, git ou IDE com os seguintes comandos:

```bash
node --version
npm --version

Se não estiverem instalados, baixe e instale a versão recomendada em nodejs.org.

1.2. Criar a Estrutura do Projeto
Crie uma nova pasta para o projeto:
mkdir meu-chatbot
cd meu-chatbot
Inicie um novo projeto Node.js:
npm init -y

1.3. Instalação das Dependências
Instale as dependências necessárias:
