import { Switch, Route } from "react-router";
import "./App.css";
import MeasureMapCompOl from "./components/mapComponent/olFunctionComp";
import MeasureMapCompOlExt from "./components/mapComponent/olExtFunctionComp";
//components
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/Home";


function App() {
  
  return (
    <div className="App">
      <NavBar />
      <main style={{ }}>
        <Switch>
          <Route exact path="/ol" component={MeasureMapCompOl} />
          <Route exact path="/olext" component={MeasureMapCompOlExt} />
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    </div>
  );
}

export default (App);
