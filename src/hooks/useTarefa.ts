import { useMutation, useQuery } from "react-query";
import { API, queryClient } from "../service";
import { Tarefa } from "./interface/tarefa";

export const useGetTarefas = () => {
    return useQuery(['get-tarefas'], async () => {
        const response = await API.get('/api/v1/tarefas');
        return response.data;
    });
}

export const useEditTarefa = () => {
    return useMutation<Tarefa, unknown, Tarefa>(
        async (tarefa) => {
            const response = await API.put('/api/v1/tarefas/update', tarefa);
            return response.data;
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries('get-tarefa');
            }
        }
    );
}

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
