import { useContext, useState } from "react";
import { app } from "../base";
import { AuthContext } from "./Auth";
import AddTodo from "./todos/AddTodo";
import TodoList from "./todos/TodoList";
import DatePicker from "react-horizontal-datepicker";

const Home = () => {
  const { currentUser }: any = useContext(AuthContext);
  console.log("curent user:", currentUser);
  const [value, onChange] = useState(new Date());
  const selectedDay = (val: any) => {
    onChange(val);
  };

  console.log(value);
  return (
    <div className="home_page">
      <h4 className="title">Clever To-DO-List</h4>
      <div className="sign-out">
        {`Hey! ${currentUser.displayName}`}
        <button className="" onClick={() => app.signOut()}>
          Sign out
        </button>
      </div>
      <DatePicker
        getSelectedDay={selectedDay}
        labelFormat={"MMMM"}
        color={"#ff6600"}
        endDate={90}
      />
      <p className="task completedTask"></p>
      <p className="task unCompletedTask"></p>

      <TodoList selectedDate={value} />
      <AddTodo />
    </div>
  );
};

export default Home;
