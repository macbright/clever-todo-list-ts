import React from "react";
import "./stylesheets/App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/signUp";
import Home from "./Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import TodoItem from "./todos/TodoItem";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="main">
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/todos/:id" component={TodoItem} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
