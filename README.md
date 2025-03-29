
# Sistema de restaurante

## Tecnologias

Está sendo utilizado no backend as seguintes tecnologias:

```
Java 23
Spring Boot 3.5.0-M2
MongoDB 8.0.5
JUnit/Mockito
Docker
```

Está sendo utilizado no frontend as seguintes tecnologias:

```
React 19.0.0
Nextjs 15.2.2
Context API
tailwind 4.0.14
axios
```

## Gerenciamento de estados global

O gerenciamento de estados global está sendo feito com Context API do React funcionando com Nextjs e
utilizando persistencia via "localStorage" no Provider de estados do token de acesso às APIs.

## Arquitetura

No backend está sendo utilizado o padrão MVC com Controllers, DTOs, Mappers, Services, Repositories, etc.

No frontend está sendo utilizado o padrão MVVN para separar a lógica de consumo das APIs dos componentes renderizáveis.

## Como Rodar?

### Rodando o backend

Para rodar a aplicação no lado backend, é necessário o servidor de banco de dados postgresql em execução. Isto pode ser feito com um comando docker-compose como abaixo executado na raiz do projeto onde se encontra o arquivo "docker-compose.yaml". Na raiz do projeto, execute o seguinte comando:

```
docker-compose up --build
```

Após o servidor de banco de dados iniciado, se pode executar o backend da aplicação com o seguintes comandos executados na raiz do projeto:

```
mvnw clean package
java -jar target/sisrest-0.0.1-SNAPSHOT.jar
```

### Rodando o frontend

Para rodar o frontend basta navegar até a pasta frontend e executar os seguinte comandos:

Caso seja a primeira vez executando o frontend do projeto execute o seguinte comando:

```
npm install
```

Agora execute o seguinte comando:

```
npm run dev
```

Com isso o projeto estará rodando em modo de desenvolvimento.

Agora é só abrir no navegador com a seguinte URL:

```
http://localhost:3000
```

Será mostrada a página de login. Então, o usuário suportado pela aplicação até o momento é:

```
Usuário: italo
Senha: italo
```

Isso redirecionará para a página de items de pedidos!
