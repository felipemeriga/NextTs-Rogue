# Aula 1 -Introdução ao React e NextJS

## Introdução

Nesta aula, não tocaremos nessa classe em nenhum tipo de código ainda, é apenas
uma introdução das tecnologias que usaremos, e os objetivos do curso.

## Objetivos

Os objetivos deste curso são basicamente ensinar os fundamentos do framework NextJS e o superset do Javascript, o
Typescript. Além disso, o objetivo aqui não é apenas ensinar como usar este framework de front-end, mas criar APIs,
estabelecendo conexões com um banco de dados, criando testes, simulações e implantando o aplicativo final
de uma forma elegante, usando pipelines de CI / CD.

## O que Aprenderemos Neste Curso

- Como programar e usar Typescript, uma linguagem superset do Javascript.
- Como usar o framework NextJS mais recente, para usar o desempenho de páginas da web estáticas renderizadas por servidor.
- Noções básicas do framework React
- Como criar uma camada de API com NextJS
- Como criar uma conta MongoDB gratuita e banco de dados hospedado em nuvem
- Conecte sua camada de API com o banco de dados NoSQL
- Criar respostas de mockup HTTP
- Controle de versão do código fonte
- Implementando seu aplicativo no Vercel
- Pipelines de CI / CD do seu aplicativo


## [React](https://reactjs.org/)

React é uma biblioteca JavaScript de front end de código aberto para a construção de interfaces de usuário ou componentes de IU. É mantido
pelo Facebook e uma comunidade de desenvolvedores individuais e empresas. O React pode ser usado como base no desenvolvimento de
aplicativos de página única ou mobile.


## [NextJS](https://nextjs.org/)

Next.js é um framework de desenvolvimento de front-end React de código aberto criada pela Vercel que permite funcionalidades
como renderização do lado do servidor e geração de sites estáticos para aplicativos da web baseados em React.

Basicamente, existem três maneiras de criar páginas da web: páginas dinâmicas, aplicativos de página única e
páginas estáticas.

Páginas estáticas é a mais antiga e a mais rápida, e o mecanismo usado
por NextJS, onde a página da web que você está acessando, é primeiro renderizada no servidor e, em seguida,
enviado para o navegador como conteúdo estático, onde apenas o necessário é processado e enviado
para o navegador.

Os aplicativos de página única, todos os arquivos do aplicativo são solicitados, mesmo que não sejam usados, e
Javascript lerá as diretivas do aplicativo e mostrará a parte da IU que é solicitada. A coisa ruim
é que o navegador carrega todos os arquivos, mesmo que alguns deles não sejam usados, então este
torna a atualização da página mais lenta, mas uma vez que os arquivos são carregados, a navegação é muito rápida.

Next, basicamente usa React, que é um framework de aplicativo de página única, e adiciona renderização de servidor
para ele, produzindo uma página de resultados estáticos, melhorando o desempenho do aplicativo.

## [MongoDB](https://www.mongodb.com/2)

MongoDB é um programa de banco de dados orientado a documentos. Classificado como um programa de banco de dados NoSQL,
O MongoDB usa documentos do tipo JSON com esquemas opcionais.