import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { Todo } from "../interfaces/todo";

const Todos = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<{ title: string }>();

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddClick = (data: { title: string }) => {
    setTodos((prev) => [...prev, { id: uuid(), title: data.title, isCompleted: false }]);
    resetField("title");
  };

  const handleDeleteClick = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-6 rounded-md bg-gray-800 gap-6">
        <h1 className="text-2xl text-gray-50">Minhas tarefas</h1>

        <div className="flex items-center gap-4">
          <input
            className="rounded-md p-3 text-gray-50 bg-gray-600"
            placeholder="Digite o nome da tarefa"
            {...register("title", { required: true })}
          />
          <button aria-label="Adicionar tarefa" onClick={() => handleSubmit(handleAddClick)()}>
            <AiOutlinePlus className="text-gray-50" size={24} />
          </button>
        </div>

        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-4 w-full justify-between">
            <p className="text-gray-50 rounded-md p-3 bg-gray-700 w-full">{todo.title}</p>

            <button aria-label={`Deletar tarefa: ${todo.title}`} onClick={() => handleDeleteClick(todo.id)}>
              <AiOutlineDelete size={24} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
