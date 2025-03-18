
# Sistema de restaurante

## Tecnologias

Está sendo utilizado no backend as seguintes tecnologias:

Java 23
Spring Boot 3.5.0-M2
MongoDB 8.0.5
JUnit/Mockito
Docker

Está sendo utilizado no frontend as seguintes tecnologias:

React 19.0.0
Nextjs 15.2.2
tailwind 4.0.14
axios

## Criação do projeto frontend

```
mkdir frontend
cd frontend

npm init -y
npm install next react react-dom
```

### Editando o arquivo "package.json"

Trocar:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

Por:
```
"scripts": {
  "dev": "next -p 3000",
  "build": "next build",
  "start": "next start"
}
```

### Criando a primeira página

Crie a pasta "pages" e, dentro dela, o arquivo "index.js" que será o script principal.
O arquivo index.js pode ter inicialmente o seguinte conteúdo:

```
const Index = () => (
    <h1>Funcionou!</h1>;
);

export default Index;
```

### Criando o arquivo de estilo global

Crie a pasta "styles" no mesmo nível da pasta "pages" e, dentro dela, crie um arquivo chamado "globals.css". È nesse arquivo onde ficarão os estilos css puros.

### Criando o arquivo "_app.js"

Crie o arquivo "_app.js" na raiz da pasta "pages" (mesmo nível de "index.js") com o seguinte conteúdo:

```
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Component {...pageProps} />;
    );
}

export default MyApp;
```

### Instalando o tailwind

Execute os seguintes comandos no terminal:

```
npm install tailwindcss @tailwindcss/postcss postcss
```

Crie o arquivo "postcss.config.mjs" na raiz do projeto (mesmo nível de "package.json") com o seguinte conteúdo:

```
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

Edite o arquivo "styles/globals.css" e adicione a seguinte linha no início:

```
@import "tailwindcss";
```

Agora o tailwind pode ser utilizado nas páginas da aplicação.

### Instalando o axios

Execute o seguinte comando:

```
npm i axios
```

### Rodando em modo de desenvolvimento

Para rodar em modo de desenvolvimento basta executar na raiz do projeto, pelo terminal, o seguite comando:

```
npm run dev
```

E, então, abrir no navegador a página:

```
http://localhost:3000
```

E verá o conteúdo que se inicia na página "index.js" da pasta "pages".
