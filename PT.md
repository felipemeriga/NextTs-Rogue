# Aula 5 - Adicionando Estilo ao Nosso App


Nesta aula, iremos adicionar estilo ao nosso aplicativo,
vamos adicionar algumas classes CSS aos nossos componentes, porque até agora
temos apenas elementos HTML simples.

Existem muitas maneiras de adicionar CSS / SCSS ao seu aplicativo, que podemos usar para
exemplo da biblioteca [styled-components](https://styled-components.com/docs/api),
que é uma das melhores opções para estilizar nossos componentes.

Por uma questão de simplicidade e como o foco desse curso, não é o estilo,
usaremos CSS simples e antigo e alguns recursos do Flexbox.

Então, basicamente, você só precisa criar um arquivo chamado [styles.css](styles.css),
e passado o seguinte conteúdo (Lembre-se de que a explicação de cada um dos
conteúdos colados, são explicados na aula de vídeo):

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
body {
    margin: 0;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';
}
a {
    color: #0070f3;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
hr {
    border: none;
    border-top: 1px solid #eaeaea;
}

.container {
    max-width: 40rem;
    margin: 1.5rem auto;
    padding: 0 1rem;
}

h2 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding: 0 32px;
}
h4 {
    color: #555;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
}
.createNew {
    display: inline-block;
    background-color: #0070f3;
    border-radius: 3px;
    color: #fff;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
}
.createNew:hover {
    text-decoration: none;
}
.table {
    border: 1px solid #eaeaea;
    border-radius: 4px;
    min-width: 512px;
    padding-top: 24px;
}
.headerRow {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 32px;
}
.creditCard {
    margin-left: auto;
}

```


```typescript jsx
// pages/_app.js
import App from 'next/app'
import React from 'react'
import '../styles.css'

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default MyApp

```