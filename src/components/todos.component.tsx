import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { FaPlus, FaDeleteLeft } from "react-icons/fa6";
import { Todo } from "./interface/todo";

const Todos = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<{ title: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddClick = (data: { title: string }) => {
    setTodos(prev => [...prev, { id: uuid(), title: data.title, isCompleted: false }]);
    resetField("title");
  };

  const handleDeleteClick = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center flex-col">
      <h1 className="text-4xl text-gray-200 mb-16">Minhas tarefas</h1>

      <div className="w-72 flex justify-center items-center flex-col">
        <div className="flex gap-5">
          <input type="text" className="rounded-md p-3 text-gray-50 bg-gray-800" placeholder="Digite o nome da tarefa"
            {...register("title", { required: true })}
          />
          <button aria-label="Adicionar tarefa" onClick={() => handleSubmit(handleAddClick)()}><FaPlus size={24} className="text-gray-50" /></button>
        </div>
        {
          todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-4 w-full justify-between rounded-md px-5 py-2 bg-gray-800 mt-20">
              <p className="text-gray-200 w-full h-8 flex justify-center items-center">
                {todo.title}
              </p>
              <button aria-label={`Deletar tarefa: ${todo.title}`} onClick={() => handleDeleteClick(todo.id)}>
                <FaDeleteLeft size={26} className="text-red-500" />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Todos;
