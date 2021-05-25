import React, { useContext, useState } from "react";
import firebase, { firestore, app } from "../../base";
import AddTodoModal from "./AddTodoModal";

const AddTodo = () => {
  const todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState(false);

  const handleSubmit = (todo) => {
    setTodo(todo);
    if (
      todo.date === null ||
      todo.text === undefined ||
      todo.text.trim().length <= 0 ||
      todo.date.getDate() === undefined
    ) {
      setError("todo can't not be blank or date picker can't be blank");
    } else {
      todosRef.add({
        text: todo.text,
        complete: false,
        date: todo.date,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setTodo("");
      setModal(!modal);
    }

    console.log(todo);
  };

  const handleEdit = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setTodo(value);
  };

  return (
    <div className="addTodo">
      <button className="add_todo" onClick={handleEdit}>
        {" "}
        + AddTodo
      </button>

      <AddTodoModal
        displayModal={modal}
        closeModal={handleEdit}
        handleClick={handleSubmit}
        buttonType={"Save"}
        error={error}
      />
    </div>
  );
};

export default AddTodo;
