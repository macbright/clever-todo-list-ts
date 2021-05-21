import { type } from "os";
import DatePicker from "react-datepicker";

type Date = {
  nanosecounds: number;
  seconds: number;
};

export type Todo = {
  complete: boolean;

  createAt: Date;
  date: Date;

  text: string;

  id: string;
};

export type TodoListData = [Todo];

export type Id = {
  id: string;
};

export type DayPicker = string;
