import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import ReactDOM from "react-dom";
import Cave from "./components/cave/Cave";
import './index.css';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Cave />
      </Provider>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
