import Express from 'express';
import router from './router';
import webpack from 'webpack'
const app = new Express();
const port = 3000, redirectPort = 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');

const NODE_ENV = process.env.NODE_ENV;
if( NODE_ENV !== 'production' ){
  const config = require(`./cfg/${process.env.NODE_ENV}`)
  const compiler = webpack( config );
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require( 'webpack-hot-middleware');
  app.use(
    webpackDevMiddleware( compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
  app.use( webpackHotMiddleware( compiler ))
}

const compress = require('compression');
var http = require('http');

import React from 'react';
import configureStore from './src/config/store'
import { StaticRouter, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from './src/App/ConnectedApp'

app.use( compress() );
app.use( cookieParser() );
app.use( bodyParser.urlencoded({ extended:false }) );
app.use( bodyParser.json({ limit:'5mb' }) );
app.use( router() );

app.use( handleRequest );

function handleRequest( req, res ){
  const context = {};
  const initialState = { environment:{ NODE_ENV }};
  const store = configureStore( initialState );
  const html = renderToString(
    React.createElement( Provider, { store }, // Redux Wrapper
      React.createElement( StaticRouter, { location:req.url, context }, // React Router ServerSide wrap
				NODE_ENV === 'production' ?
					React.createElement( Route, { path:'/', component:App }) :
					React.createElement( AppContainer, null, // Hot loader wrap
						React.createElement( Route, { path:'/', component:App })
					)
      )
    )
  )
	if ( context.redirectUrl){
		res.redirect( 302, '/' );
	} else {
		res.status(200).send(renderFullPage( html, store.getState() ));
	}
}


function renderFullPage(html, initialState ) {


	let stylesheet = '';
		if ( NODE_ENV === 'production' )
		stylesheet = '<link href="/build/style.css" rel="stylesheet"/>'

  return `
    <!doctype html>
    <html lang="en" xml:lang="en">
      <head>
        <title>L2 Boilerplate</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="description" content="L2 Boilerplate"/>
        <link rel="icon" type="img/ico" href="build/favicon.ico"/>
        
        ${ stylesheet }
      </head>
      <body>
        ${ html }
        <script>
          window.__INITIAL_STATE__ = ${ JSON.stringify( initialState ) }
        </script>
        <script src="/build/app.js"></script>
      </body>
    </html>
    `
}


app.listen( port, ( error ) => {
  error ?
    console.error( error ) :
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
});

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen( redirectPort );
