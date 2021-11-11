import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Routes from './routes'



function App() {

  return (
    <BrowserRouter>
      <Route render={(props) => (
        <Routes />
      )} />
    </BrowserRouter>
  );
}

export default App;
