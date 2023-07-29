import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  useLocation,
} from "react-router-dom";

import SignIn from "./components/SignIn";

import Login from "./components/Login";
import MoviesList from "./components/MoviesList";

const NavigationLinks = () => {
  const location = useLocation();

  // Hide navigation links on the SignIn page
  if (location.pathname === "/") {
    return null;
  }
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/movieslist">Movie List</NavLink>
        </li>
      </ul>
    </nav>
  );
};
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/movieslist" component={MoviesList} />
        </Switch>
      </Router>
    );
  }
}
export default App;
