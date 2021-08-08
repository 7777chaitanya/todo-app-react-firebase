import {
  Button,
  FormHelperText,
  ListItem,
  TextField,
  ListItemText,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import React, { Component } from "react";
import db from "./firebase";
import firebase from "firebase/app";

class App extends Component {
  state = {
    todo: [],
    input: "",
  };

  async componentDidMount() {
    const { docs: dbCollection } = await db
      .collection("todos")
      .orderBy("timestamp", "desc")
      .get();
    const todo = [...dbCollection];
    console.log("cdm", todo);

    this.setState({ todo });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("input is : ", this.state.input);

    await db.collection("todos").add({
      todo: this.state.input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const { docs: dbCollection } = await db
      .collection("todos")
      .orderBy("timestamp", "desc")
      .get();
    const todo = [...dbCollection];
    const input = "";
    this.setState({ todo, input });

    console.log("handle subm");
  };

  handleInputChange = (e) => {
    const input = e.target.value;
    this.setState({ input });
  };

  handleDelete = async (item) => {
    await db.collection("todos").doc(item.id).delete();
    const { docs: dbCollection } = await db
      .collection("todos")
      .orderBy("timestamp", "desc")
      .get();
    const todo = [...dbCollection];
    this.setState({ todo });
  };

  render() {
    const { todo, input } = this.state;
    return (
      <div>
        <h1>Todo List Application</h1>

        <form action="Submit" onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            id="outlined-basic"
            label="Enter here"
            variant="outlined"
            type="text"
            value={this.state.input}
            onChange={(e) => this.handleInputChange(e)}
            style={{ marginRight: 10 }}
          />

          <FormHelperText id="my-helper-text">
            Prioritise your Todo list carefully!
          </FormHelperText>

          <Button
            variant="contained"
            color="primary"
            onClick={(e) => this.handleSubmit(e)}
            disabled={!input}
          >
            Add to List
          </Button>
        </form>

        <div>
          <ul>
            {todo.map((item) => (
              <div key={item.id}>
                <ListItem role={undefined} dense button>
                  <ListItemText primary={item.data().todo} />

                  <DeleteForeverIcon onClick={() => this.handleDelete(item)} />
                </ListItem>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
