// import React, { Component } from 'react';
// import './App.css';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//           <h1>hello world</h1>
//       </div>
//     );
//   }
// }
// export default App;

import React from 'react'
import Header from './components/Header'
import Main from './components/Main'

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App
