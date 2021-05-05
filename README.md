# Class 5 - Adding Style to our App

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

In this class we are going to be adding style to our app,
we will add some CSS classes to our components, because until now
we only have plain HTML elements.

There are many ways to add CSS/SCSS to your app, we can use for
example the library [styled-components](https://styled-components.com/docs/api),
that it's one of the best options for styling our components.

For sake of simplicity and as the focus of that course, it's styling,
we will use the plain and old CSS, and some Flexbox capabilities.

So basically, you just need to create a file called [styles.css](styles.css),
and past the following content(Remember that the explanation of each of the 
pasted contents, are explained in the video class):

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
body {
    background-color: honeydew;
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

Mas como NextJS funciona como páginas estáticas, todas as páginas são renderizadas no lado do servidor,
precisamos ter certeza de que todas as páginas terão acesso ao CSS, então a única coisa que você precisa
a fazer é importar este CSS em [_app.tsx] (pages / _app.tsx), para que todos os arquivos o recebam.
Porque, como vimos na última aula, o arquivo _app.tsx substitui a configuração de renderização do lado do servidor
das páginas.

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