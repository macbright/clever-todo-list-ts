import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  displayModal: boolean;
  closeModal: Function;
  error: string;
  buttonType: string;
  handleClick: Function;
};

interface TodoProps {
  text: string;
  date: null;
  complete: boolean;
  createdAt: string;
}

const AddTodoModal = (props: Props) => {
  const [todo, setTodo] = useState<TodoProps>({
    text: "",
    date: null,
    complete: false,
    createdAt: "",
  });
  const [startDate, setStartDate] = useState();
  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setTodo({ ...todo, text: value });
  };

  const handleDate = (date, e) => {
    e.preventDefault();
    console.log("check date for ts", typeof date);
    setStartDate(date);
    setTodo({ ...todo, date: date });
  };

  const upDateToddo = () => {
    props.handleClick(todo);
  };

  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }
  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      {console.log("checked: from modal ", startDate)}{" "}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <span className="error">{props.error}</span>
        <br />
        <textarea
          placeholder="write your todo"
          rows={6}
          required
          value={todo.text}
          onChange={handleChange}
        ></textarea>{" "}
        <DatePicker selected={startDate} onChange={handleDate} />
        <button className="save" onClick={upDateToddo}>
          {" "}
          {props.buttonType}
        </button>
      </div>{" "}
    </div>
  );
};

export default AddTodoModal;
