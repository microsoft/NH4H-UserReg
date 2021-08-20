import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon,Grid,Header } from 'semantic-ui-react'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
  
  <Grid centered> 
  
          <div className="ui segment"  style={{marginTop:100}} >
          <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
          </div>       
   </Grid>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
