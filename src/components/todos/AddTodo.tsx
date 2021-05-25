import React, { useState } from "react";
import firebase, { firestore, app } from "../../base";
import AddTodoModal from "./AddTodoModal";

const AddTodo = () => {
  const todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState(false);

  const handleSubmit = (todo) => {
    if (
      todo.date === null ||
      todo.text === undefined ||
      todo.text.trim().length <= 0
    ) {
      console.log(
        todo.date === null,
        todo.text === undefined,
        todo.text.trim().length,
        todo.date === undefined
      );
      setError("todo can't not be blank or date picker can't be blank");
    } else {
      console.log(
        todo.date === null,
        todo.text === undefined,
        todo.text.trim().length,
        todo.date === undefined,
        Object.keys(todo.date).length === 0
      );
      todosRef.add({
        text: todo.text,
        complete: false,
        date: todo.date,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setModal(!modal);
    }

    console.log(todo);
  };

  const handleEdit = () => {
    setModal(!modal);
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
