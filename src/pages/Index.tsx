import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Success",
        description: "Todo added successfully",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      toggleTodo(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Success",
        description: "Todo deleted successfully",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Todo List</h1>
        <div className="space-y-6">
          <AddTodo onAdd={(task) => addMutation.mutate(task)} />
          <div className="space-y-3">
            {todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(id, completed) =>
                  toggleMutation.mutate({ id, completed })
                }
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;