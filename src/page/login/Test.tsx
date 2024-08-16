import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to My Page!</h1>
        <p>
          This is a sample page created with React. It includes a title, a
          paragraph, a list, and a button.
        </p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button onClick={() => alert("Button clicked!")}>Click me</button>
      </div>
    );
  }
}

export default App;
