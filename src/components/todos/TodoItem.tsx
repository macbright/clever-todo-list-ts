import React, { useEffect, useState } from "react";
import { firestore, app } from "../../base";
import { useParams, Link, useHistory } from "react-router-dom";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { Id } from "../types/Todo";

interface TodoProps {
  text: string;
  date: {};
  complete: boolean;
  createdAt: string;
  id: string;
}

const TodoItem = () => {
  let { id }: Id = useParams();
  const history = useHistory();
  const [todo, setTodo] = useState<TodoProps>();
  let todosRef;
  if (app.currentUser)
    todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [modal, setModal] = useState(false);
  // const [todoDate, setTodoDate] = useState();

  useEffect(() => {
    let docRef = todosRef.doc(id);
    console.log(todo);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data: any = doc.data();
          setTodo(data);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const onCompleteTodo = (todo) =>
    todosRef.doc(id).set({ complete: !todo.complete }, { merge: true });

  const update = (todo: TodoProps) => {
    setTodo(todo);
    console.log("updated todo from update 4", todo);
    todosRef.doc(id).set({ text: todo.text, date: todo.date }, { merge: true });
    setModal(!modal);
  };

  const handleEdit = () => {
    setModal(!modal);
  };

  const onDeleteTodo = () => {
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
              onChange={() => onCompleteTodo(todo)}
            />
            <a onClick={onDeleteTodo}>
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
