import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch("/todos.json");
  if (!response.ok) throw new Error("Failed to load todos.json");
  return response.json() as Promise<Todo[]>;
}

function Todos() {
  const { data, isLoading, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data.</p>;

  return (
    <>
      <h1>Vite + JSPM Import Maps + TypeScript</h1>
      <p>
        Loaded {data.length} todos from static JSON using @tanstack/react-query.
      </p>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? "DONE" : "TODO"} - {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
}

const queryClient = new QueryClient();
const root = createRoot(document.querySelector<HTMLDivElement>("#app")!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  </StrictMode>,
);
