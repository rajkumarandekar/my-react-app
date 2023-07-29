import { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css";
class Login extends Component {
  state = { name: "", password: "", isLogged: false };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { name, password } = this.state;
    if (userData && userData.name === name && userData.password === password) {
      this.setState({ isLogged: true });
    } else {
      alert("Invalid Credentials");
    }
  };
  render() {
    const { name, password } = this.state;
    if (this.state.isLogged) {
      return <Redirect to="/movieslist" />;
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleLogin}>
          <h1>Login</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChangeName}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChangePassword}
          />

          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
