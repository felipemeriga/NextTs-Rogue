# Aula 19 - Implantando na Vercel

Finalmente, terminamos a codificação, mas a parte mais importante é agora, é
implantando nosso aplicativo para Vercel.

Vercel é o criador do NextJS, e também a plataforma sem servidor que seremos
capaz de implantar o aplicativo.

Você só precisa ir para https://vercel.com/
e você poderá fazer o login com sua conta do github, e
selecione um repo para criar um projeto e implantar sua infraestrutura.

Quando você cria um projeto no Vercel, basicamente você pode selecionar o repositório onde o NextJS
projeto é localizado, e então o Vercel fará tudo para você, a única coisa que você precisa fazer é configurar
as variáveis ​​de ambiente, como você não pode enviar o arquivo .env para o repo, você precisa configurar novamente
as variáveis ​​de ambiente, portanto, configure-o no Vercel, lembre-se de definir ```REACT_MOCK_ON``` para falso,
porque não queremos implantar o mock, e preencher ```MONGODB_URL``` com sua conexão de string de banco de dados.

Você também pode configurar domínios para seu aplicativo, se desejar.

Para saber mais sobre a configuração do Vercel, basta assistir a aula gravada.