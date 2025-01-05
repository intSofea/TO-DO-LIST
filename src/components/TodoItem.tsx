import { Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Todo } from "@/lib/supabase";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 backdrop-blur-xl bg-background/30 rounded-lg border border-border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(todo.id, !todo.is_completed)}
          className={cn(
            "h-6 w-6 rounded-full",
            todo.is_completed ? "text-green-500" : "text-muted-foreground"
          )}
        >
          {todo.is_completed ? <Check size={16} /> : <X size={16} />}
        </Button>
        <span
          className={cn(
            "text-foreground",
            todo.is_completed && "line-through text-muted-foreground"
          )}
        >
          {todo.task}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-destructive hover:text-destructive/90"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};