# Class 1 -  Introduction to React and NextJS

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

## Introduction

This class we won't be touching in any kind of code yet, it's just 
an introduction of the technologies that we will be using,
why and the goals of the course.

## Goals

The goals of this course it's basically teaching the basics of NextJS framework, and the Javascript superset 
Typescript. Additionally, the aim here is not only to teach using this frontend framework, but creating APIs,
establishing connections with a Database, creating tests, mocks and deploying the final application
in a fashion way, using CI/CD pipelines.

## What You are Going to Learn on That Course 

- How to program and use Typescript, a superset language of Javascript.
- How to use the latest NextJS framework, for using the performance of static server rendered web pages.
- Basics of React framework
- How to create an API layer with NextJS
- How to create a free MongoDB account and cloud hosted database
- Connect your API layer with the NoSQL database
- Create HTTP mockup responses 
- Source code versioning
- Deploying your application to Vercel
- CI/CD Pipelines of your application


## [React](https://reactjs.org/)

React is an open-source, front end, JavaScript library for building user interfaces or UI components. It is maintained 
by Facebook and a community of individual developers and companies. React can be used as a base in the development of 
single-page or mobile applications.


## [NextJS](https://nextjs.org/)

Next.js is an open-source React front-end development web framework created by Vercel that enables functionality
such as server-side rendering and generating static websites for React based web applications.

Basically there are three ways that web pages get created, they are, dynamic pages, single page applications and
static pages.

Static pages it's the oldest one, and the fastest one, and the mechanism used
by NextJS, where the webpage that you are accessing, are first rendered in the server, and then
sent to the browser as static content, where only that is needed is rendered and sent 
to the browser.

The single page applications, all the application files are requested, even if they are not going to be used, and 
Javascript will read the directives of the application and show the piece of UI that is requested. The bad thing
is that the browser loads all the files, even that some of them won't be used, so this 
makes the page refresh slower, but once the files are loaded, the navigation it's really fast.

Next basically uses React, which is a Single Page Application framework, and adds server rendering
to it, producing a static result page, improving the performance of the application.

## [MongoDB](https://www.mongodb.com/2)

MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program,
MongoDB uses JSON-like documents with optional schemas.