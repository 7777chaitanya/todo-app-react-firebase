import { Button, FormHelperText, TextField } from "@material-ui/core";
import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  // console.log("value ->",input);

  // console.log("todo ->",todo);

  return (
    <div>
      <h1>App component</h1>

      <form
        action="Submit"
        onSubmit={(e) => {
          setTodo([...todo, input]);
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
            setTodo([...todo, input]);
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
              <li key={item}>{item}</li>
              <button>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
