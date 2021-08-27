import React from "react"
import Nav from "./components/Nav/Nav"
import routes from './routes.js';
import libraryHome from "./media"

function App() {
  return (
    <div className = "App">
      <meta 
        name = "image" 
        property = "og:image" 
        content = {libraryHome}>
      </meta>
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
