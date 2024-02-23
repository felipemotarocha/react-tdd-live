import { screen, render, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from './todos.component';
import { queryClient } from '../service';
import { QueryClientProvider } from 'react-query';

describe('Todos', () => {
    it('should show my tasks message', () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });
        
        expect(screen.getByText('Minhas tarefas')).toBeInTheDocument();
    });

    it('should show task input', () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        expect(screen.getByPlaceholderText('Digite o nome da tarefa')).toBeInTheDocument();
    });

    it('should show add button', () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        expect(screen.getByLabelText('Adicionar tarefa')).toBeInTheDocument();
    });

    it('should add task on add click', async () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');

        const taskTtile = 'Nova tarefa';

        await userEvent.type(input, taskTtile);

        screen.getByDisplayValue(taskTtile);

        await userEvent.click(addBtn);

        screen.getByPlaceholderText('Digite o nome da tarefa');
    });

    it('should delete task on delete click', async () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');

        const taskTtile = 'Nova tarefa';

        await userEvent.type(input, taskTtile);

        screen.getByDisplayValue(taskTtile);

        await userEvent.click(addBtn);

        const deleteBtns = screen.getAllByLabelText(`Deletar tarefa: ${taskTtile}`);

        const deleteTasks = screen.queryAllByText(taskTtile);

        await act(async () => {
            deleteBtns.forEach(async (deleteBtn) => {
                await userEvent.click(deleteBtn);
            });
        });

        await waitFor(() => {
            deleteTasks.forEach((deleteTask) => {
                expect(deleteTask).not.toBeInTheDocument();
            });
        });
    });

    it('should open edit', async () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');

        const taskTitle = 'Nova tarefa';

        await userEvent.type(input, taskTitle);

        screen.getByDisplayValue(taskTitle);

        await userEvent.click(addBtn);

        const editBtns = screen.getAllByLabelText(`Editar tarefa: ${taskTitle}`);

        await act(async () => {
            editBtns.forEach(async (editBtn) => {
                await userEvent.click(editBtn);
            });
        });
    });

    it('should open edit and edit the task', async () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');

        const taskTitle = 'Nova tarefa';

        await userEvent.type(input, taskTitle);

        screen.getByDisplayValue(taskTitle);

        await userEvent.click(addBtn);

        const editBtns = screen.getAllByLabelText(`Editar tarefa: ${taskTitle}`);

        await act(async () => {
            editBtns.forEach(async (editBtn) => {
                await userEvent.click(editBtn);
            });
        });

        const editInput = screen.getByPlaceholderText('Edite sua tarefa');

        const taskTitle2 = 'Novissima Tarefa';

        await userEvent.type(editInput, taskTitle2);

        const editBtnFinal = screen.getByLabelText('Editar tarefa');

        await userEvent.click(editBtnFinal);
    });

    it('should search taskTitle', async () => {
        act(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Todos />
                </QueryClientProvider>
            );
        });

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');
    
        const taskTitle = 'Nova tarefa';
    
        await userEvent.type(input, taskTitle);
    
        screen.getByDisplayValue(taskTitle);
    
        await userEvent.click(addBtn);
    
        const search = screen.getByPlaceholderText('Pesquise sua tarefa');
    
        await userEvent.type(search, taskTitle);
    
        const tasks = screen.getAllByText(taskTitle);

        expect(tasks.length).toBeGreaterThanOrEqual(1);
    })
});
