import React from "react";
import { Link } from "react-router-dom";

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lists">
        {this.props.lists.map((list) => (
          <Link to={`${list.id}`} key={`${list.id}`}>
            {" "}
            {list.name}{" "}
          </Link>
        ))}
      </div>
    );
  }
}
