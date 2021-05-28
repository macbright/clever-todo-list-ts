import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TodoProps {
  text: string;
  date: {};
  complete: boolean;
  createdAt: string;
  id: string;
}

type Props = {
  displayModal: boolean;
  closeModal: Function;
  todo: TodoProps;
  buttonType: string;
  upDatedTodo: Function;
};

type Error = string;

const Modal = (props: Props) => {
  const [todo, setTodo] = useState<TodoProps>(props.todo);
  const [startDate, setStartDate] = useState();
  const [error, setError] = useState<Error>("");

  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };

  useEffect(() => {}, []);

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setTodo({ ...todo, text: value });
  };

  const handleDate = (date, e) => {
    e.preventDefault();
    setTodo({ ...todo, date: date });
    console.log("todosss", date);
    setStartDate(date);
  };

  const handleUpdate = () => {
    if (
      todo.date === null ||
      todo.text === undefined ||
      todo.text.trim().length <= 0
    ) {
      setError("todo can't not be blank or date picker can't be blank");
    } else {
      props.upDatedTodo(todo);
    }
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
