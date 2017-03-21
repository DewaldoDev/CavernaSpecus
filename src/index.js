import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import ReactDOM from "react-dom";
import CaveContainer from "./components/cave/CaveContainer";
import './index.css';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CaveContainer />
      </Provider>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
