import { useState } from "react";
import firebase, { firestore, app } from "../../base";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

interface TodoProps {
  text: string;
  date: {};
  complete: boolean;
  createdAt: string;
  id: string;
}
interface Props {
  todo: TodoProps;
}

const TodoShow = (props: Props) => {
  let todosRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  if (app.currentUser)
    todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [checked, setChecked] = useState(props.todo.complete);

  const { id, text, complete } = props.todo;
  const onCompleteTodo = () =>
    todosRef.doc(id).set({ complete: !complete }, { merge: true });

  return (
    <div className="todoList">
      {console.log("todo check", props.todo)}
      <Link to={{ pathname: `/todos/${id}` }}>{text}</Link>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={onCompleteTodo}
      />
      <div className="clearfix" />
    </div>
  );
};

TodoShow.propTypes = {
  todo: PropTypes.object,
};
export default TodoShow;
