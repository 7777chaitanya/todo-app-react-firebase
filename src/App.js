import {
  Button,
  FormHelperText,
  ListItem,
  TextField,
  ListItemText,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import React, { Component } from "react";
import db from "./firebase";
import firebase from "firebase/app";
import "./App.css";

class App extends Component {
  state = {
    todo: [],
    input: "",
    open: false,
    modalInput: "",
    editId: "akumpadam",
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

  handleOpen = (item) => {
    // console.log("handleOpen =>",item);
    this.setState({ open: true, editId: item.id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleModalChange = (e) => {
    this.setState({ modalInput: e.target.value });
  };

  handleTodoEdit = async () => {
    const input = this.state.modalInput;
    const itemId = this.state.editId;
    // console.log("handle Todo Edit : ", this.state.editId, input);

    await db
      .collection("todos")
      .doc(itemId)
      .set({ todo: input }, { merge: true });
    const { docs: dbCollection } = await db
      .collection("todos")
      .orderBy("timestamp", "desc")
      .get();
    const todo = [...dbCollection];
    this.setState({ todo, modalInput: "" });

    this.setState({ open: false });
  };

  render() {
    const { todo, input, editId } = this.state;
    // console.log('editId => ',editId);
    return (
      <div>
        <h1>Todo List Application</h1>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modal"
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className="paper">
              <div>
                <h2 id="transition-modal-title">Edit your Todo item here!</h2>
                <p id="transition-modal-description">
                  You can enter the modfied todo in the below input field!
                </p>
                <input
                  type="text"
                  value={this.state.modalInput}
                  onChange={(e) => this.handleModalChange(e)}
                />
                <button onClick={() => this.handleTodoEdit()}>
                  Edit finished!
                </button>
              </div>
            </div>
          </Fade>
        </Modal>

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
                  <button
                    type="button"
                    onClick={() => {
                      // console.log("edit onClick =>",item)
                      this.handleOpen(item);
                    }}
                  >
                    Edit
                  </button>

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
