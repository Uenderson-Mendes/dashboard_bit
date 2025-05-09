
# 📊 Dashboard Bit

Este projeto é um painel de controle desenvolvido com **React.js**, que consome dados de uma API REST para exibir informações em tempo real. Ele foi criado como parte de um sistema embarcado, onde dispositivos como o Raspberry Pi Pico W enviam dados para a API, e o dashboard os apresenta de forma visual.
### 🖼️ Visual do Dashboard

![Dashboard Bit](https://drive.google.com/uc?export=view&id=1sbiQwXp3I91TRoywKrqNFK-HKa5BHSk1)
## 🌐 Demonstração

A aplicação está hospedada em: [dashboard-bit.vercel.app](https://dashboard-bit.vercel.app)

## 🛠️ Tecnologias Utilizadas

- [React.js](https://reactjs.org/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Axios](https://axios-http.com/)
- [Vercel](https://vercel.com/)

## 📁 Estrutura do Projeto

```

dashboard\_bit/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── App.js
│   └── index.js
├── package.json
├── README.md
└── ...

````

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Uenderson-Mendes/dashboard_bit.git
   cd dashboard_bit


2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie a aplicação em modo de desenvolvimento:**

   ```bash
   npm start
   ```

   Acesse `http://localhost:3000` no seu navegador.

4. **Para gerar a versão de produção:**

   ```bash
   npm run build
   ```

## ▶️ Scripts Disponíveis

Dentro do diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento.
Abre [http://localhost:3000](http://localhost:3000) no navegador.
A página será recarregada automaticamente em caso de alterações.

### `npm test`

Executa o test runner no modo interativo.
Veja mais sobre [testes](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Cria a versão de produção na pasta `build/`.
Otimizado para performance, os arquivos são minificados e prontos para deploy.

### `npm run eject`

⚠️ **Atenção:** essa operação é irreversível.
Copia as configurações e dependências (Webpack, Babel etc.) diretamente para seu projeto.
Após o `eject`, todos os comandos continuam funcionando, mas você terá controle total da configuração.

## 🔍 Análise do Código

### `src/App.js`

Componente principal que:

* Gerencia o layout da aplicação.
* Renderiza os componentes visuais.
* Pode realizar chamadas à API ou repassar dados para componentes filhos.

### `src/components/`

* **Dashboard.jsx**: Componente que consome os dados da API e renderiza gráficos, cards e painéis.
* **Card.jsx**: Elemento visual para mostrar dados como temperatura, botões, joystick, etc.

### `src/services/api.js`

Configura a conexão com a API externa usando Axios:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-node-dash-bitdoglab.onrender.com',
});

export default api;
```

### Exemplo de uso em um componente:

```js
useEffect(() => {
  api.get('/dados')
    .then(response => setDados(response.data))
    .catch(err => console.error(err));
}, []);
```

## 📡 Integração com Dispositivos

Os dados são enviados por um microcontrolador (como o Raspberry Pi Pico W), que realiza POSTs para a URL:

```
https://api-node-dash-bitdoglab.onrender.com/dados
```

Esses dados são então exibidos em tempo real no painel do dashboard.

## 📚 Saiba Mais

* Documentação oficial do [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
* Documentação do [React](https://reactjs.org/)
### 🖥️ Visualização do Dashboard


### 🖥️ Acesse o Dashboard Interativo

[![Abrir Dashboard Bit](https://img.shields.io/badge/Abrir-Dashboard-green?style=for-the-badge)](https://dashboard-bit.vercel.app/)

