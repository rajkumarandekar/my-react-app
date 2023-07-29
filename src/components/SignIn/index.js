import { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css";
class SignIn extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    phNo: "",
    profession: "",
    redirectToLogin: false,
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleChangephNo = (event) => {
    this.setState({ phNo: event.target.value });
  };

  handleChangeSelect = (event) => {
    this.setState({ profession: event.target.value });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    const userData = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      phNo: this.state.phNo,
      profession: this.state.profession,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    this.setState({ redirectToLogin: true });
  };

  render() {
    const { name, password, email, phNo, profession, redirectToLogin } =
      this.state;
    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="signin-container">
        <h1>Sign In</h1>
        <input
          type="text"
          name="Name"
          placeholder="Enter Name"
          value={name}
          onChange={this.handleChangeName}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={this.handleChangePassword}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={this.handleChangeEmail}
        />
        <input
          type="number"
          name="Phone Number"
          placeholder="Phone Number"
          value={phNo}
          onChange={this.handleChangephNo}
        />
        <select
          name="profession"
          value={profession}
          onChange={this.handleChangeSelect}
        >
          <option value="">Select Profession</option>
          <option value="Engineer">Engineer</option>
          <option value="Docter">Docter</option>
          <option value="Teacher">Teacher</option>
        </select>
        <button className="btn" onClick={this.handleSignIn}>
          Sign In
        </button>
      </div>
    );
  }
}
export default SignIn;
