export enum ItemTypes {
  CARD = "card",
}

export enum DroppableTypes {
  INCOMPLETE_TASKS = "incomplete",
  COMPLETE_TASKS = "complete",
}

export enum TaskStatus {
  INCOMPLETE = "incomplete",
  COMPLETE = "complete",
}

export interface Item {
  _id: string;
  details: string;
  title: string;
  category: string;
  status: string;
}
