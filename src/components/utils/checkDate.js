import { TodoListData, Todo } from "../types/Todo";

export const checkDate = (selectedDate, todoList) => {
  let list = [];
  todoList.forEach((todo) => {
    let todoDay = +todo.date.toDate().getDay();
    let todoMonth = +todo.date.toDate().getMonth();
    let todoYear = +todo.date.toDate().getFullYear();
    let sDay = +selectedDate.getDay();
    let sMonth = +selectedDate.getMonth();
    let sYear = +selectedDate.getFullYear();

    const todoDate = todoDay + todoMonth + todoYear;
    const sDate = sDay + sMonth + sYear;
    if (todoDate === sDate) {
      list.push(todo);
    }
  });
  return list;
};
