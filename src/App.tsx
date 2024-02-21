import Todos from "./components/todos.component";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./service";

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
};

export default App;
