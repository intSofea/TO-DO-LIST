import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";
import { ParticleBackground } from "@/components/ParticleBackground";
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <div className="min-h-screen py-8 dark:bg-transparent bg-transparent">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Todo List</h1>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </div>
          <div className="space-y-6 backdrop-blur-xl bg-background/30 p-6 rounded-lg border border-border shadow-lg">
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
              {todos?.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No todos yet. Add one above!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;