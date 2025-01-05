import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Todo = {
  id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
};

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