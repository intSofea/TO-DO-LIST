import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Todo = Database['public']['Tables']['todos']['Row'];

export async function fetchTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addTodo(task: string) {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ task, is_completed: false }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleTodo(id: string, is_completed: boolean) {
  const { data, error } = await supabase
    .from('todos')
    .update({ is_completed })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}