import "./App.css";
import Nav from "./components/Nav.jsx";
import Router from "./components/Router.jsx";
import Tooltip from "./components/Tooltip.jsx";
import AppContext from "./context/app.js";

function App() {
  const context = AppContext();
  console.log(context.theme);
  return (
    <div class="app">
      <Nav />
      <main class="container">
        <Router />
        <Tooltip />
      </main>
    </div>
  );
}

export default App;
