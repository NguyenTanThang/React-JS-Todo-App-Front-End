import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import FaceBookLogin from "./components/FacebookLogin";
import TodoList from "./components/todos/todoList";
import NoteList from "./components/notes/noteList";
import ViewNote from "./components/notes/viewNote";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={FaceBookLogin} />
          <Route path="/dashboard" component={TodoList} />
          <Route exact path="/notes" component={NoteList} />
          <Route path="/notes/:id" component={ViewNote} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
