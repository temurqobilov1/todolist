"use client";

import { useEffect, useState, FormEvent } from "react";
import TodoCard from "./component/todo-comp";

export interface TodoType {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

const Home = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<TodoType[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todo") || "[]");
    setData(saved);
  }, []);

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() && !description.trim()) return;

    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: Date.now(),
    };

    const updatedData = [...data, newTodo];
    setData(updatedData);
    localStorage.setItem("todo", JSON.stringify(updatedData));

    setTitle("");
    setDescription("");
  };

  const deleteTodo = (id: string) => {
    const updatedData = data.filter((todo) => todo.id !== id);
    setData(updatedData);
    localStorage.setItem("todo", JSON.stringify(updatedData));
  };

  const updateTodo = (id: string, newTitle: string, newDescription: string) => {
    const updatedData = data.map((todo) =>
      todo.id === id
        ? { ...todo, title: newTitle, description: newDescription }
        : todo
    );
    setData(updatedData);
    localStorage.setItem("todo", JSON.stringify(updatedData));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-2.5 gap-6">

          <form
            onSubmit={addTodo}
            className="lg:col-span-1 bg-white rounded-xl p-6 shadow-md sticky top-6"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Add New Todo
            </h2>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="title"
                className="text-sm font-medium mb-2 text-gray-800"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter todo title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none border border-gray-200 p-3 rounded-md focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-900"
              />
            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="desc"
                className="text-sm font-medium mb-2 text-gray-800"
              >
                Description
              </label>
              <textarea
                id="desc"
                placeholder="Enter todo description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none border border-gray-200 p-3 rounded-md min-h-[90px] resize-none focus:ring-2 focus:ring-blue-400 transition bg-white text-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md shadow hover:scale-[1.01] transform transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Todo
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Todo List</h2>
              <p className="text-sm text-gray-600">{data.length} items</p>
            </div>

            {/* FULL WIDTH GRID */}
            <div className="grid grid-cols-1 gap-4">
              {data.length === 0 && (
                <div className="col-span-full p-6 bg-white rounded-lg text-center shadow border border-gray-100">
                  <p className="text-gray-700">
                    No todos yet — add your first task!
                  </p>
                </div>
              )}

              {data.map((todo) => (
                <div
                  key={todo.id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <TodoCard
                    {...todo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
