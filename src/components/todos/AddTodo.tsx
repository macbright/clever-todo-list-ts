import React, { useCallback, useState } from "react";
import firebase, { firestore, app } from "../../base";
import AddTodoModal from "./AddTodoModal";

const AddTodo = () => {
  let todosRef;
  if (app.currentUser)
    todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState(false);

  const handleSubmit = useCallback((todo) => {
    if (
      todo.date === null ||
      todo.text === undefined ||
      todo.text.trim().length <= 0
    ) {
      setError("todo can't not be blank or date picker can't be blank");
    } else {
      todosRef.add({
        text: todo.text,
        complete: false,
        date: todo.date,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setModal(!modal);
    }

    console.log(todo);
  }, []);

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
