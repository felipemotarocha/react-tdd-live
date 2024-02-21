import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from './todos.component';

describe('Todos', () => {
    it('should show my tasks message', () => {
        render(<Todos />);

        expect(screen.getByText('Minhas tarefas')).toBeInTheDocument();
    });

    it('should show task input', () => {
        render(<Todos />);

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        expect(input).toBeInTheDocument();
        // expect(input).toHaveStyle({ padding: "1px" });
    });

    it('should show add button', () => {
        render(<Todos />);
        expect(screen.getByLabelText('Adicionar tarefa')).toBeInTheDocument();
    });

    it('should add task on add click', async () => {
        render(<Todos />);

        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');

        const taskTtile = 'Nova tarefa';

        await userEvent.type(input, taskTtile);

        screen.getByDisplayValue(taskTtile);

        await userEvent.click(addBtn);

        screen.getByPlaceholderText('Digite o nome da tarefa');

        // screen.getByText(taskTtile);
        expect(screen.queryAllByText("Nova tarefa")).toHaveLength(1);
    });

    it('should delete task on delete click', async () => {
        render(<Todos />);

        // Adicionar tarefa:
        const input = screen.getByPlaceholderText('Digite o nome da tarefa');

        const addBtn = screen.getByLabelText('Adicionar tarefa');

        const taskTtile = 'Nova tarefa';

        await userEvent.type(input, taskTtile);

        screen.getByDisplayValue(taskTtile);

        await userEvent.click(addBtn);

        // Deletar tarefa:
        const deleteBtn = screen.getByLabelText(`Deletar tarefa: ${taskTtile}`);
        
        const deleteTask = screen.queryByText(taskTtile);

        await userEvent.click(deleteBtn);

        expect(deleteTask).not.toBeInTheDocument();
    })
});
