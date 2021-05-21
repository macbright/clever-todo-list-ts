import React, { useContext, useState } from "react";
import firebase, { firestore, functions, app } from "../../base";
import { AuthContext } from "../Auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AddTodoModal from "./AddTodoModal";

const AddTodo = () => {
  //   const addTodo = functions.httpsCallable("addTodo");
  const todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [todoDate, setTodoDate] = useState(new Date());

  const handleSubmit = (todo) => {
    setTodo(todo);
    if (todo === null || todo.text === "") {
      setError("todo can't not be blank");
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
