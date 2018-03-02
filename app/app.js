import React from 'react';
import ReactDOM from 'react-dom';
//Import Container component
import AppContainer from './containers/app.container';

// Component Class
class App extends React.Component{
  render() {
    return (
      <AppContainer />
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render( 
  < App / > ,
  document.getElementById('content')
);