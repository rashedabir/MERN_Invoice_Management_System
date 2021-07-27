import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import DashBoard from "./screens/DashBoard";
import { DataProvider } from "./GlobalState";
import Home from "./screens/Home";

function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Registration} path="/register" />
          <Route exact component={DashBoard} path="/dashboard" />
        </Switch>
      </Router>
    </DataProvider>
  );
}

export default App;
