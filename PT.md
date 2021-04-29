# Aula 2 - Instalando Dependencias

## Dependencias

Para ter nosso projeto instalado e funcionando de maneira elegante, precisaremos da ajuda de dependências de terceiros e
bibliotecas, e as utilizadas são:

-   [Axios](https://www.npmjs.com/package/axios): Biblioteca usada para fazer solicitações HTTP / HTTPS.
-   [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter): Usado para criar solicitações de simulação de HTTP para nosso
    aplicativo.
-   [mongoose](https://www.npmjs.com/package/mongoose): Para interagir com o banco de dados.
-   [express](https://www.npmjs.com/package/express): Usado para expor endpoints HTTP/HTTPS como o servidor API.
-   [react-hook-form](https://www.npmjs.com/package/react-hook-form): Usado para criar ganchos para nossos formulários
-   [react-query](https://www.npmjs.com/package/react-query): Usado para criar ganchos e gerenciamento de estado para cada um dos
    componentes.

## Instalando Node e NPM

Para instalar as dependências e obter todos os módulos Javascript que você precisa para instalar o Node e NPM, pode encontrar a instalação dele, para qualquer sistema operacional, neste link abaixo:

https://www.npmjs.com/get-npm

## Instalando Dependencias do Projeto

Depois de instalar o NPM, as dependências necessárias para esse projeto estão todas no arquivo [package.json](./package.json),
só precisa executar o NPM para instalar tudo.

Execute este comando no caminho raiz do seu projeto:
```shell
npm install
```


O NPM irá buscar todas as dependências dentro de [package.json](./package.json).

## Testing ESlint and Prettier

Estaremos usando ESLint, que é uma ferramenta de correção de código e linting e
Prettier, que é uma ferramenta de formatação. Essas ferramentas serão capazes de nos ajudar a manter tudo
claro, organizado e formatado. Além disso, estamos usando isso para que você possa se acostumar com essas ferramentas, para
seus próximos projetos, onde a qualidade do código e aprimoramento da qualidade da sintaxe, é uma prática muito boa.


ESlint e Prettier são configurados nos respectivos arquivos:
- [.eslintrc.json](.eslintrc.json)
- [.prettierrc.json](.prettierrc.json)

Na aula gravada, você tera um conhecimento profundo de cada um deles.

Essas duas ferramentas já estão definidas no [package.json](package.json), se você executou o último
passo, eles já estarão instalados, vamos testá-los agora.

Para testar se essas ferramentas estão funcionando corretamente, crie um arquivo denominado index.tsx em [pages](./pages), e
cole o seguinte conteúdo:

```typescript jsx
import React from 'react'

const Index: React.FunctionComponent = () => {
    return (
        <div title="Home">
            <h1>Hello Next.js 👋</h1>
        </div>
    )
}

export default Index
```


