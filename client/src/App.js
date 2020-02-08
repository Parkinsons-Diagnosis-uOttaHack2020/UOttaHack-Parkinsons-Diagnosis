import React from 'react';
import States from "./components/context/GlobalStates";
import RouterComponent from "./Router";

function App() {
  return (
    <React.Fragment>
      <States>
        <RouterComponent />
      </States>
    </React.Fragment>
  );
}

export default App;
