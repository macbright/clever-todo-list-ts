import React, { useContext, useEffect, useState } from "react";
import { firestore, functions, app } from "../../base";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams, Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { check } from "prettier";
import { Todo, Id } from "../types/Todo";

const TodoItem = () => {
  let id2: Id = useParams();
  const history = useHistory();
  const [todo, setTodo] = useState<any>();
  const todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [modal, setModal] = useState(false);
  const [todoDate, setTodoDate] = useState();

  useEffect(() => {
    let docRef = todosRef.doc(id2.id);
    console.log(todo);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setTodo(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const onCompleteTodo = (id, complete) =>
    todosRef.doc(id).set({ complete: !complete }, { merge: true });

  const update = (todo) => {
    setTodo(todo);
    console.log("updated todo from update 4", todo);
    todosRef
      .doc(id2.id)
      .set({ text: todo.text, date: todo.date }, { merge: true });

    setModal(!modal);
  };

  const handleEdit = () => {
    setModal(!modal);
  };

  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
    history.push("/");
  };

  return (
    todo !== undefined && (
      <div className="todo_page">
        <h4>
          {" "}
          <Link to="/">
            <FontAwesomeIcon icon={faBackward} />
          </Link>{" "}
          Todays Task
        </h4>
        <div className="todoContent">
          <p>{todo.text}</p>
          <div className="todo_edit">
            <input
              type="checkbox"
              defaultChecked={todo.complete}
              onChange={() => onCompleteTodo(id2.id, todo.complete)}
            />
            <a onClick={() => onDeleteTodo(id2.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </a>
            <a onClick={handleEdit}>
              {" "}
              <FontAwesomeIcon icon={faEdit} />
            </a>
          </div>
        </div>
        {todo.text && (
          <Modal
            displayModal={modal}
            closeModal={handleEdit}
            todo={todo}
            upDatedTodo={update}
            buttonType={"Update"}
          />
        )}
      </div>
    )
  );
};

export default TodoItem;
