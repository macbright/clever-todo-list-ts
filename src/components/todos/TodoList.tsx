import { useEffect, useState } from "react";
import { firestore, app } from "../../base";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TodoShow from "./TodoShow";
import { checkDate } from "../utils/checkDate";
import { TodoListData, Todo } from "../types/Todo";

const TodoList = ({ selectedDate }: any) => {
  const todosRef = app.currentUser
    ? firestore.collection(`users/${app.currentUser.uid}/todos`)
    : null;
  const [todos]: any = useCollectionData(todosRef, { idField: "id" });
  const [list, setList] = useState<TodoListData>();
  const [selectedList, setSelectedList] = useState<TodoListData>();

  useEffect(() => {
    setList(todos);
  }, [todos]);

  useEffect(() => {
    if (list) {
      let selected: any = checkDate(selectedDate, list);
      setSelectedList(selected);
    }
  }, [list, selectedDate]);

  const SelectedListTodos = selectedList?.map((todo: Todo) => {
    return (
      <div key={todo.id} className="">
        {" "}
        <TodoShow todo={todo} />{" "}
      </div>
    );
  });

  return (
    <div className="todolistpage">
      <h4>{(selectedList && selectedList.length) || 0} Tasks Today</h4>
      <div className="infinite-scroll">{list && SelectedListTodos}</div>
    </div>
  );
};

export default TodoList;
