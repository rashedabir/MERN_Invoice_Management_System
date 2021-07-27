import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./screens/Login";
import Registration from "./screens/Registration";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={Registration} path="/register" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
