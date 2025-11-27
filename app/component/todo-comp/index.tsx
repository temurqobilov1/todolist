import { TodoType } from "@/app/page";
import { FC, useState } from "react";

interface PropsType extends TodoType {
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string, description: string) => void;
}

const TodoCard: FC<PropsType> = ({
  id,
  title,
  description,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    if (!editTitle.trim() || !editDescription.trim()) return;
    updateTodo(id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col gap-1">
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border border-gray-100 p-1 rounded outline-none"
            />
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="border border-gray-100 p-1 rounded outline-none"
            />
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          onClick={() => deleteTodo(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
