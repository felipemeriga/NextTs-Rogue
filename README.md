# Class 2 - Installing the dependencies

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

## Dependencies

In order to have our project up and running in a fashion way, we will need the help of third party dependencies and
libraries, and the used ones are:

-   [Axios](https://www.npmjs.com/package/axios): Library used for doing HTTP/HTTPS requests.
-   [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter): Used for creating mocks HTTP requests for our
    application.
-   [mongoose](https://www.npmjs.com/package/mongoose): For interacting with the database.
-   [express](https://www.npmjs.com/package/express): Used for exposing HTTP endpoints as the API server.
-   [react-hook-form](https://www.npmjs.com/package/react-hook-form): Used to create hooks with our forms.
-   [react-query](https://www.npmjs.com/package/react-query): Used for creating hooks and state management for each of the
    components.

## Installing Node and NPM

In order to install the dependencies and get all the Javascript modules you would need to install Node and NPM, you can
find the installation of it, for any operational system, in this link bellow:

https://www.npmjs.com/get-npm

## Installing the Dependencies of the Project

After installing NPM, the dependencies needed for that project are all in the [package.json](./package.json) file, we
just need to execute NPM to install everything.

Run this command on the root path of your project:

```shell
npm install
```

NPM will fetch all the dependencies inside [package.json](./package.json).

## Testing ESlint and Prettier

For testing if those tools are working properly, create a file named index.tsx under [pages](./pages), directory, and
paste the following content:

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
