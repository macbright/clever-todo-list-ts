import React, { useEffect, useState } from "react";
import firebase, { firestore, app } from "../../base";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TodoShow from "./TodoShow";
import { checkDate } from "../utils/checkDate";
import { TodoListData, Todo } from "../types/Todo";

const TodoList = ({ selectedDate }: any) => {
  const todosRef = firestore.collection(`users/${app.currentUser.uid}/todos`);
  const [todos]: any = useCollectionData(todosRef, { idField: "id" });
  const [list, setList] = useState<TodoListData>();
  let selectedList: any = [];

  useEffect(() => {
    setList(todos);
  }, [todos]);

  const listItems = list?.map((todo) => {
    selectedList = checkDate(selectedDate, list);
  });

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
