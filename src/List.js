import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function List(props) {
  let { id } = useParams();
  let list = [];
  list = props.lists.filter((list) => list.id == id);
  if (list === null || list.length == 0) {
    return <h1>this list doesn't exist</h1>;
  }
  let filmIds = props.lists.films;
  films = [];
  for (let filmId of filmIds) {
    axios.get("{")
    let list = await axios
        .get(`${apiUrl}/GetList/?ListId=${listId}`, config)
  }

  return (
    <React.Fragment>
      <h1>{list[0].name}</h1>

      <Link to="films\"></Link>
    </React.Fragment>
  );
}
