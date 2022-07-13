import { Switch, Route } from "react-router";
import "./App.css";
import MapComponent from "./components/mapComponent/fumctionComp";
//components
import NavBar from "./components/navBar/NavBar";


function App() {
  
  return (
    <div className="App">
      <NavBar />
      <main style={{ }}>
        <Switch>
          <Route path="/" component={MapComponent} />
        </Switch>
      </main>
    </div>
  );
}

export default (App);
