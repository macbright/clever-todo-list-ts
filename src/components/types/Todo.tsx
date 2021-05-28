export type Date = {};

export interface Todo {
  complete: boolean;
  createdAt: string;
  date: {};
  text: string;
  id: string;
}

export type TodoListData = [Todo];

export type Id = {
  id: string;
};

export type DayPicker = string;
