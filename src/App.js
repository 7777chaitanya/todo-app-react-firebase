import {
  Button,
  Checkbox,
  FormHelperText,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";

import db from "./firebase";
import firebase from "firebase";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  useEffect(() => {
    async function getData() {
      const { docs: dbCollection } = await await db.collection("todos").get();
      const todos = [];
      dbCollection.forEach((doc) => todos.push(doc.data()["todo"]));
      // console.log(todos);
      setTodo([...todos]);
    }
    getData();
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <h1>App component</h1>

      <form
        action="Submit"
        onSubmit={(e) => {
          db.collection("todos").add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          // setTodo([...todo, input]);
          setInput("");
          e.preventDefault();
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter here"
          variant="outlined"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <FormHelperText id="my-helper-text">
          Prioritise your Todo list carefully!
        </FormHelperText>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            db.collection("todos").add({
              todo: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            // setTodo([...todo, input]);
            setInput("");
          }}
          disabled={!input}
        >
          Add to List
        </Button>
      </form>

      <div>
        <ul>
          {todo.map((item) => (
            <div>
              <ListItem
                key={item}
                role={undefined}
                dense
                button
                onClick={handleToggle(item)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": item }}
                  />
                </ListItemIcon>
                <ListItemText id={item} primary={item} />
                <Button variant="contained" color="secondary">
                  DELETE
                </Button>
                <Button variant="contained" color="primary">
                  CHECK/UNCHECK
                </Button>
              </ListItem>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
