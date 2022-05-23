import React from "react";
import { login } from "./AuthService";

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(this.state.data);
      window.localStorage.setItem("token", data.token);
      window.location = "/";
    } catch (error) {
      this.setState({ errors: error.response.data.message });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    return (
      <form>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        ></input>
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        ></input>
        <input
          type="button"
          onClick={this.handleSubmit}
          value="Sign In"
        ></input>
      </form>
    );
  }
}
