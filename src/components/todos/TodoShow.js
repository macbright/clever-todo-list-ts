import React, { useContext, useState } from "react";
import firebase, { firestore, functions, app } from "../../base";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TodoShow = (todo) => {
  //   const addTodo = functions.httpsCallable("addTodo");
  const todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [checked, setChecked] = useState(todo.todo.complete);

  const { id, text, complete } = todo.todo;
  const onCompleteTodo = (id, complete) =>
    todosRef.doc(id).set({ complete: !complete }, { merge: true });

  return (
    <div className="todoList">
      <Link to={{ pathname: `/todos/${id}`, todo: todo }}>{text}</Link>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={() => onCompleteTodo(id, complete)}
      />
      <div className="clearfix" />
    </div>
  );
};

TodoShow.propTypes = {
  todo: PropTypes.object,
};
export default TodoShow;
