import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import DashBoard from "./screens/DashBoard";
import { GlobalState } from "./GlobalState";
import Home from "./screens/Home";
import { useContext } from "react";
import NotFound from "./screens/NotFound";
import Customer from "./screens/Customer";
import Invoice from "./screens/Invoice";
import AddInvoice from "./screens/AddInvoice";

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={isLogged ? NotFound : Login} path="/login" />
        <Route
          exact
          component={isLogged ? NotFound : Registration}
          path="/register"
        />
        <Route
          exact
          component={isLogged ? DashBoard : NotFound}
          path="/dashboard"
        />
        <Route
          exact
          component={isLogged ? Customer : NotFound}
          path="/customer"
        />
        <Route
          exact
          component={isLogged ? Invoice : NotFound}
          path="/invoice"
        />
        <Route
          exact
          component={isLogged ? AddInvoice : NotFound}
          path="/addinvoice"
        />
        <Route
          exact
          component={isLogged ? AddInvoice : NotFound}
          path="/invoice/:id"
        />
        <Route exact component={NotFound} path="*" />
      </Switch>
    </Router>
  );
}

export default App;
