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
