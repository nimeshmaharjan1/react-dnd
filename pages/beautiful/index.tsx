import React, { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import Incomplete from "@components/beautiful/incomplete";
import Complete from "@components/beautiful/complete";
import { DroppableTypes } from "@lib/enums";
import { Item } from "@pages/sortable";

export enum TodoStatus {
  COMPLETED,
  INCOMPLETE,
}

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  todoPosition?: number;
}

const BeautifulContainer = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const addTodo = () => {
    if (todo) {
      setTodos([...todos, { id: uuid(), text: todo, status: TodoStatus.INCOMPLETE }]);
    }
  };
  const [mounted, setMounted] = useState(false);
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    let todoToAdd,
      incomplete = todos,
      complete = completedTodos;
    if (source.droppableId === DroppableTypes.INCOMPLETE_TASKS) {
      todoToAdd = incomplete[source.index];
      incomplete.splice(source.index, 1);
    } else if (source.droppableId === DroppableTypes.COMPLETE_TASKS) {
      todoToAdd = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === DroppableTypes.INCOMPLETE_TASKS) {
      incomplete.splice(destination.index, 0, todoToAdd as Todo);
    } else {
      complete.splice(destination.index, 0, todoToAdd as Todo);
    }
    const sortedTodos = incomplete.map((todo) => ({ ...todo, todoPosition: incomplete.indexOf(todo) }));
    setTodos(sortedTodos);
    console.log({ sortedTodos });
    setCompletedTodos(complete);
  };
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col items-center">
        <header className="py-4 border-b-2 w-full text-center">
          <h2 className="font-bold text-2xl">Tasksify</h2>
        </header>
        <main className="flex flex-col gap-4 py-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-base-200 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add
          </button>
        </main>
        <div className="todos flex flex-col sm:flex-row gap-2 w-full justify-center items-center pb-4">
          <Droppable droppableId={DroppableTypes.INCOMPLETE_TASKS}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="incomplete min-h-[500px] bg-emerald-500 min-w-[400px] rounded flex flex-col justify-center items-center gap-2"
              >
                {todos.map((todo: Todo, index: number) => (
                  <Incomplete key={todo.id} {...{ todo, index }} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <Droppable droppableId={DroppableTypes.COMPLETE_TASKS}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="incomplete h-[500px] bg-orange-500 min-w-[400px] rounded flex flex-col justify-center items-center gap-2 overflow-y-scroll"
              >
                {completedTodos.map((todo: Todo, index: number) => (
                  <Complete key={todo.id} {...{ todo, index }} />
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable> */}
        </div>
      </div>
    </DragDropContext>
  );
};

export default BeautifulContainer;
