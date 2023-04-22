import { screen, render, getByPlaceholderText, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todos from "./todos.component";

describe("Todos", () => {
  it("should show my tasks message", () => {
    render(<Todos />);

    expect(screen.getByText("Minhas tarefas")).toBeInTheDocument();
  });

  it("should show task input", () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Digite o nome da tarefa");

    expect(input).toBeInTheDocument();
  });

  it("should show add button", () => {
    render(<Todos />);

    expect(screen.queryByLabelText("Adicionar tarefa")).toBeInTheDocument();
  });

  it("should add task on add click", async () => {
    render(<Todos />);

    const input = screen.getByPlaceholderText("Digite o nome da tarefa");

    const taskTitle = "Nova tarefa";

    await userEvent.type(input, taskTitle);

    screen.getByDisplayValue(taskTitle);

    const addButton = screen.getByLabelText("Adicionar tarefa");

    await userEvent.click(addButton);

    screen.getByPlaceholderText("Digite o nome da tarefa");

    expect(screen.queryAllByText("Nova tarefa")).toHaveLength(1);
  });

  it("should delete task on delete click", async () => {
    render(<Todos />);

    // Adicionar tarefa
    const input = screen.getByPlaceholderText("Digite o nome da tarefa");

    const taskTitle = "Nova tarefa";

    await userEvent.type(input, taskTitle);

    screen.getByDisplayValue(taskTitle);

    const addButton = screen.getByLabelText("Adicionar tarefa");

    await userEvent.click(addButton);

    // Deletar tarefa que foi adicionada

    const deleteButton = screen.getByLabelText(`Deletar tarefa: ${taskTitle}`);

    await userEvent.click(deleteButton);

    const deletedTask = screen.queryByText(taskTitle);

    expect(deletedTask).not.toBeInTheDocument();
  });
});
