import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import CaveContainer from "./components/cave/CaveContainer";

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CaveContainer />
      </Provider>
    );
  }
}

export default App;
