import { type } from "os";
import DatePicker from "react-datepicker";

type Date = {};

export interface Todo {
  complete: boolean;
  createdAt: Date;
  date: Date;
  text: string;
  id: string;
}

export type TodoListData = [Todo];

export type Id = {
  id: string;
};

export type DayPicker = string;
