import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { FaPlus, FaDeleteLeft } from "react-icons/fa6";
import { Todo } from "./interface/todo";
import { useCreateTarefa, useDeleteTarefa } from "../hooks/useTarefa";

const Todos = (): JSX.Element => {

  const { mutateAsync: criarTarefa } = useCreateTarefa();
  const { mutateAsync: deletarTarefa } = useDeleteTarefa();

  const {
    register,
    handleSubmit,
    resetField
  } = useForm<{ nome: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const taskId = uuid();

  const handleAddClick = async (data: { nome: string }) => {
    setTodos(prev => [...prev, { id: taskId, nome: data.nome, isCompleted: false }]);
    await criarTarefa({ tarefa_id: parseInt(taskId), tarefa_nome: data.nome });
    resetField("nome");
};

const handleDeleteClick = async (id: string, numId: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    await deletarTarefa(numId);
};

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center flex-col">
      <h1 className="text-4xl text-gray-200 mb-16">Minhas tarefas</h1>

      <div className="w-72 flex justify-center items-center flex-col">
        <div className="flex gap-5">
          <input type="text" className="rounded-md p-3 text-gray-50 bg-gray-800" placeholder="Digite o nome da tarefa"
            {...register("nome", { required: true })}
          />
          <button aria-label="Adicionar tarefa" onClick={() => handleSubmit(handleAddClick)()}><FaPlus size={24} className="text-gray-50" /></button>
        </div>
        {
          todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-4 w-full justify-between rounded-md px-5 py-2 bg-gray-800 mt-20">
              <p className="text-gray-200 w-full h-8 flex justify-center items-center">
                {todo.nome}
              </p>
              <button aria-label={`Deletar tarefa: ${todo.nome}`} onClick={() => handleDeleteClick(todo.id, parseInt(todo.id))}>
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
