# Aula 15 - Conexão com o MongoDB

Agora, quase terminamos a parte da interface do usuário do nosso aplicativo, todos os componentes
estão prontos, temos todas as funções HTTP trabalhando com os hooks, mas se lembre que os hooks
são apenas para teste, e agora que vamos começar a usar dados reais, mas primeiro precisaríamos de um banco de dados onde poderíamos colocar esses dados, e para isso usaremos o
Banco de dados NoSQL MongoDB, nesta aula, acompanhe o vídeo, que irei ajudá-lo
como criar uma conta MongoDB e também um banco de dados grátis, o bom é que
você pode ter este banco de dados remoto de teste gratuitamente.

Após seguir os passos de criação do banco de dados, e ter tudo configurado,
volte para o nosso código.

Para conectar ao MongoDB, precisaríamos da string de conexão, e no vídeo você pode verificar como fazer
diretamente do console do MongoDB, e precisaríamos dessa string para o nosso código, mas como isso é sensível,
vamos injetá-lo no aplicativo NextJS como uma variável de ambiente, e sempre lembre-se de não
push as coisas que você tem em seu arquivo .env.

Em [next.config.js](next.config.js), vamos adicionar uma nova definição de variável de ambiente, o arquivo inteiro ficará assim:
```javascript
module.exports = {
    env: {
        REACT_MOCK_ON: process.env.REACT_MOCK_ON,
        MONGODB_URL: process.env.MONGODB_URL,
    },
}

```

Agora adicione o valor da variável de ambiente ```MONGODB_URL``` no arquivo [.env](.env) que você tem, e
vamos criar uma constante no código para recebê-la, vá para [utils/constants.ts](utils/constants.ts) e
adicione a seguinte linha:

```typescript
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:'

```

Agora vamos criar todo o wrapper de conexão do MongoDB, um wrapper que é basicamente uma função que envolve outra parte do código,
e esse código empacotado, pode acessar propriedades do wrapper, como por exemplo, uma conexão com o banco de dados.

Vamos criar um novo arquivo no caminho [midleware/mongodb.ts](midleware/mongodb.ts) e colar o seguinte código:
```typescript
import * as mongoose from 'mongoose'
import { MONGODB_URL } from '../utils/constants'

const connectDB = (handler: Function) => async (req: Request, res: Response): Promise<Function> => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res)
    }
    // Use new db connection
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    return handler(req, res)
}

export default connectDB

```

Agora que temos o wrapper, antes de testá-lo, precisamos criar os documentos e modelos,
MongoDB é um banco de dados de documentos, e precisamos definir o tipo de dados que vamos adicionar, assim como temos
nossa interface Cliente, que representa um único cliente, criaremos um modelo de cliente, para que possamos adicioná-los
clientes para o banco de dados. Crie um arquivo no seguinte caminho [models/customer.ts](models/customer.ts) e adicione o
conteúdo:
```typescript
import { Document, Schema } from 'mongoose'
import { ICustomer } from '../interfaces'
import mongoose from 'mongoose'

// @ts-ignore
export interface CustomerModelInterface extends ICustomer, Document {}

export const CustomerSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    telephone: String,
    creditCard: String,
})
// @ts-ignore
mongoose.models = {}

const CustomerModel = mongoose.model<CustomerModelInterface>('customer', CustomerSchema)

export default CustomerModel

```

Agora que temos tudo pronto com o MongoDB, só precisamos começar a criar a camada API, onde todos os nossos
As solicitações HTTP serão direcionadas e, em seguida, as APIs se comunicarão com o banco de dados usando o wrapper que criamos.


