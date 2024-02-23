import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTarefa, useDeleteTarefa, useEditTarefa, useGetTarefas } from "../hooks/useTarefa";
import { FaPlus, FaDeleteLeft, FaX, } from "react-icons/fa6";
import { Todo } from "./interface/todo";
import { FaEdit } from "react-icons/fa";

const Todos = (): JSX.Element => {

  const { data: tarefas, isLoading, refetch } = useGetTarefas();
  const { mutateAsync: criarTarefa } = useCreateTarefa();
  const { mutateAsync: editarTarefa } = useEditTarefa();
  const { mutateAsync: deletarTarefa } = useDeleteTarefa();

  const { register, handleSubmit, resetField } = useForm<{ tarefa_nome: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [nomeEditado, setNomeEditado] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!isLoading && tarefas) {
      setTodos(tarefas);
      setNextId(tarefas.length !== 0 ? tarefas[tarefas.length - 1].tarefa_id + 1 : 1);
    }
  }, [isLoading, tarefas]);

  const handleAddClick = async (data: { tarefa_nome: string }) => {
    const newTodo = { tarefa_id: nextId, tarefa_nome: data.tarefa_nome };
    await criarTarefa(newTodo, {
      onSuccess: () => {
        refetch();
      }
    });
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setNextId(prevId => prevId + 1);
    resetField("tarefa_nome");
  };

  const handleDeleteClick = async (tarefa_id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.tarefa_id !== tarefa_id));
    await deletarTarefa(tarefa_id, {
      onSuccess: () => {
        refetch();
      }
    });
  };

  const handleEditClick = (tarefa_id: number, tarefa_nome: string) => {
    setEditVisible(true);
    setEditedTodo({
      tarefa_id: tarefa_id,
      tarefa_nome: tarefa_nome
    });
    setNomeEditado(tarefa_nome);
  }

  const handleConfirmEditClick = async () => {
    if (!editedTodo?.tarefa_id) return;
    if (!nomeEditado) return;
    const novoTodo = { ...editedTodo, tarefa_nome: nomeEditado };
    await editarTarefa(novoTodo, {
      onSuccess: () => {
        setEditVisible(false);
        refetch();
      },
    });
  };

  useEffect(() => {
    const filteredTodos = todos.filter(todo =>
      todo.tarefa_nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setFilteredTodos(filteredTodos);
  }, [searchTerm, todos]);

  return (
    <div className="w-screen h-screen bg-gray-950 flex items-center justify-center flex-col">
      <div className="absolute top-20 flex gap-10 w-full justify-center items-center">
        <input id="searchbar" type="text" className="w-1/4 h-10 rounded-sm px-3 shadow" placeholder="Pesquise sua tarefa" onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <h1 className="text-4xl text-gray-200 mb-16">Minhas tarefas</h1>

      <div className="w-72 flex justify-center items-center flex-col">
        <div className="flex gap-5 mb-10">
          <input
            type="text"
            className="rounded-md p-3 text-gray-50 bg-gray-800"
            placeholder="Digite o nome da tarefa"
            {...register("tarefa_nome", { required: true })}
          />
          <button
            aria-label="Adicionar tarefa"
            onClick={handleSubmit(handleAddClick)}
          >
            <FaPlus size={24} className="text-gray-50" />
          </button>
        </div>
        {
          isLoading ? (
            <div className="flex items-center gap-4 w-full justify-between rounded-md px-5 py-2 bg-gray-800 mt-2">
              <p className="text-gray-200 w-full h-8 flex justify-center items-center">
                Carregando...
              </p>
            </div>

          ) : filteredTodos ? (
            filteredTodos.map((todo) => (
              <div key={todo.tarefa_id} className="flex items-center gap-4 w-full justify-between rounded-md px-5 py-2 bg-gray-800 mt-2">
                <button aria-label={`Editar tarefa: ${todo.tarefa_nome}`} onClick={() => handleEditClick(todo.tarefa_id, todo.tarefa_nome)}>
                  <FaEdit size={26} className="text-blue-600" />
                </button>
            
                <p className="text-gray-200 w-full h-8 flex justify-center items-center">
                  {todo.tarefa_nome}
                </p>
            
                <button aria-label={`Deletar tarefa: ${todo.tarefa_nome}`} onClick={() => handleDeleteClick(todo.tarefa_id)}>
                  <FaDeleteLeft size={26} className="text-red-500" />
                </button>
              </div>
            ))
          ) : (
            
            todos.map((todo) => (
              <div key={todo.tarefa_id} className="flex items-center gap-4 w-full justify-between rounded-md px-5 py-2 bg-gray-800 mt-2">

                <button aria-label={`Editar tarefa: ${todo.tarefa_nome}`} onClick={() => handleEditClick(todo.tarefa_id, todo.tarefa_nome)}>
                  <FaEdit size={26} className="text-blue-600" />
                </button>

                <p className="text-gray-200 w-full h-8 flex justify-center items-center">
                  {todo.tarefa_nome}
                </p>

                <button aria-label={`Deletar tarefa: ${todo.tarefa_nome}`} onClick={() => handleDeleteClick(todo.tarefa_id)}>
                  <FaDeleteLeft size={26} className="text-red-500" />
                </button>
              </div>
            ))
          )
        }
      </div>

      <div className={`absolute bg-gray-300 shadow-lg w-1/2 h-1/2 rounded-lg overflow-hidden flex flex-col ${editVisible ? 'block' : 'hidden'}`}>
        <button aria-label="Sair de editar" className="ml-auto m-4" onClick={() => setEditVisible(false)}>
          <FaX size={26} className="text-red-500" />
        </button>

        <div className="flex flex-col items-center justify-center my-auto gap-16">
          <h2 className="text-3xl text-gray-800 font-semibold">Edite sua tarefa:</h2>

          <input type="text" className="w-1/2 h-10 shadow rounded px-3" placeholder="Edite sua tarefa" value={nomeEditado} onChange={e => setNomeEditado(e.target.value)} />

          <button aria-label="Editar tarefa" className="bg-green-700 w-28 h-10 rounded-md text-gray-100 shadow-lg" onClick={handleConfirmEditClick}>Editar</button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
