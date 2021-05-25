import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "../types/Todo";

type Props = {
  displayModal: boolean;
  closeModal: Function;
  todo: Todo;
  buttonType: string;
  upDatedTodo: Function;
};

// interface TodoProps {
//     text: string;
//     date: {};
//     complete: boolean;
//     createdAt: string;
//   }

type Error = string;

const Modal = (props: Props) => {
  const [todo, setTodo] = useState<Todo>(props.todo);
  const [startDate, setStartDate] = useState();
  const [error, setError] = useState<Error>("");
  //   const [todoDate, setTodoDate] = useState(props.todo.date.toDate());
  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };

  useEffect(() => {}, []);

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (value === "") {
      setError("todo text can't be empty");
    }
    setTodo({ ...todo, text: value });
  };

  const handleDate = (date, e) => {
    e.preventDefault();
    setTodo({ ...todo, date: date });
    console.log("todosss", date);
    setStartDate(date);
  };

  const handleUpdate = () => {
    props.upDatedTodo(todo);
  };

  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <span className="error">{error}</span>
        <br />
        <textarea
          placeholder="write your todo"
          rows={6}
          required
          value={todo.text}
          onChange={handleChange}
        ></textarea>{" "}
        <DatePicker selected={startDate} onChange={handleDate} />
        <button className="save" onClick={handleUpdate}>
          {" "}
          {props.buttonType}
        </button>
      </div>{" "}
    </div>
  );
};

export default Modal;
