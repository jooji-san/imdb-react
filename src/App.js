import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "./AuthService";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Lists from "./Lists";
import List from "./List";
const apiUrl = process.env.REACT_APP_API_URL;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      user: getCurrentUser(),
    };
  }

  getLists = async () => {
    let lists = [];
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    let listIds = await axios
      .get(`${apiUrl}/GetListsByUser/?userid=${this.state.user.nameid}`, config)
      .then((res) => res.data);
    for (let listId of listIds) {
      let list = await axios
        .get(`${apiUrl}/GetList/?ListId=${listId}`, config)
        .then((res) => res.data);
      lists.push(list);
    }
    return lists;
  };

  componentDidMount() {
    this.getLists().then((lists) => this.setState({ lists }));
  }

  render() {
    return (
      <div>
        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="lists" element={<Lists lists={this.state.lists} />} />
            <Route
              path="lists/:id"
              element={<List lists={this.state.lists} />}
            />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signIn">Sign in</Link>
          </li>
          <li>
            <Link to="/signUp">Sign up</Link>
          </li>
          <li>
            <Link to="/lists">Lists</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
