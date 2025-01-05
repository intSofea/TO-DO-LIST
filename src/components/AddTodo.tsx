import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (task: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        <Plus size={20} className="mr-2" /> Add
      </Button>
    </form>
  );
};