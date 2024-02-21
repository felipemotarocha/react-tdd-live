import { useMutation } from "react-query";
import { API, queryClient } from "../service";

interface Tarefa {
    tarefa_id: number;
    tarefa_nome: string;
}

// export const listAllTarefas = () => {

// }

export const useCreateTarefa = () => {
    return useMutation<Tarefa, unknown, Tarefa>(
        async (tarefa) => {
            const response = await API.post('/api/v1/tarefas', tarefa);
            return response.data;
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries('get-tarefa');
            }
        }
    );
}

export const useDeleteTarefa = () => {
    return useMutation<void, unknown, number>(
        async (tarefa) => {
            await API.delete(`/api/v1/tarefas/${tarefa}`);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries('get-tarefa');
            }
        }
    );
}
