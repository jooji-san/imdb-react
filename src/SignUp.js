import React from "react";
import { register } from "./AuthService";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        age: "",
        email: "",
      },
      errors: {},
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(this.state.data);
      window.location = "/signIn";
    } catch (error) {
      console.log(error);
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
        <label htmlFor="firstName">firstName</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        ></input>
        <label htmlFor="lastName">lastName</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        ></input>
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
        <label htmlFor="age">age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={this.state.age}
          onChange={this.handleChange}
        ></input>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        ></input>
        <input
          type="button"
          onClick={this.handleSubmit}
          value="Sign Up"
        ></input>
      </form>
    );
  }
}
