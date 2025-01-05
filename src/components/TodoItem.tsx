import { Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(todo.id, !todo.is_completed)}
          className={cn(
            "h-6 w-6 rounded-full",
            todo.is_completed ? "text-green-500" : "text-gray-400"
          )}
        >
          {todo.is_completed ? <Check size={16} /> : <X size={16} />}
        </Button>
        <span
          className={cn(
            "text-gray-700",
            todo.is_completed && "line-through text-gray-400"
          )}
        >
          {todo.task}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};