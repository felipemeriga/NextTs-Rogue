# Class 19 - Deploying To Vercel

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Finally, we finished coding, but the most important part it's now, it's
deploying our application to Vercel.

Vercel is the creator of NextJS, and also the serverless platform that we will be
able to deploy the application.

You just need to go to https://vercel.com/
and you will be able to login with your github account, and 
select a repo to create a project and deploy its infrastructure.

When you create a project on Vercel, basically you are able to select the repo were NextJS
project is located, and then Vercel will do everything to you, the only thing that you need to do it's configuring
the environment variables, as you can't push .env file to the repo, you need to configure again
the environment variables, so, configure it on Vercel, remember to set ```REACT_MOCK_ON``` to false,
because we don't want to deploy the mock, and fill ```MONGODB_URL``` with your database string connection.

You can also configure domains for your application if you want.

For checking more about the configuration of Vercel, just it in the recorded class.