import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Todo, TabType } from "../types";
import { getRandomColor, normalizeTodo } from "../utils/todoHelpers";
import { CARD_COLORS } from "../constants/todoConstants";
import { TODOS_QUERY_KEY } from "../constants/todoConstants";


export function useTodoMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  applyOptimisticUpdate: (currentTodos: Todo[], variables: TVariables) => Todo[],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      queryClient.setQueryData<Todo[]>(
        TODOS_QUERY_KEY,
        (current = []) => applyOptimisticUpdate(current, variables),
      );
      return { previousTodos };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(TODOS_QUERY_KEY, context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}


const useTodos = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("active");

 

  const { data: todos = [], isLoading: loading } = useQuery<Todo[]>({
    queryKey: TODOS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data.map(normalizeTodo);
    },
  });



  const addMutation = useTodoMutation(
    async (newTodo: { title: string; description: string; timeRange: string }) => {
      const { error } = await supabase.from("todos").insert([
        {
          title: newTodo.title,
          description: newTodo.description,
          time_range: newTodo.timeRange,
          completed: false,
          color: getRandomColor(),
        },
      ]);
      if (error) throw error;
    },
    (current, newTodo) => [
      {
        id: crypto.randomUUID(),
        title: newTodo.title,
        description: newTodo.description,
        timeRange: newTodo.timeRange,
        completed: false,
        color: CARD_COLORS[0],
      },
      ...current,
    ],
  );

  const toggleMutation = useTodoMutation(
    async (payload: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from("todos")
        .update({ completed: payload.completed })
        .eq("id", payload.id);
      if (error) throw error;
    },
    (current, payload) =>
      current.map((todo) =>
        todo.id === payload.id ? { ...todo, completed: payload.completed } : todo,
      ),
  );

  const deleteMutation = useTodoMutation(
    async (id: string) => {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;
    },
    (current, id) => current.filter((todo) => todo.id !== id),
  );

  const editMutation = useTodoMutation(
    async (updatedTodo: { id: string; title: string; description: string; timeRange: string }) => {
      const { error } = await supabase
        .from("todos")
        .update({
          title: updatedTodo.title,
          description: updatedTodo.description,
          time_range: updatedTodo.timeRange,
        })
        .eq("id", updatedTodo.id);
      if (error) throw error;
    },
    (current, updatedTodo) =>
      current.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
      ),
  );



  const filteredTodos = useMemo(() => {
    const todosByTab = todos.filter((todo) =>
      activeTab === "active" ? !todo.completed : todo.completed,
    );

    const query = searchQuery.trim().toLowerCase();
    if (!query) return todosByTab;

    return todosByTab.filter((todo) =>
      todo.title.toLowerCase().includes(query),
    );
  }, [todos, activeTab, searchQuery]);

  

  function addTodo(title: string, description: string, timeRange: string) {
    addMutation.mutate({ title, description, timeRange });
  }

  function toggleTodo(id: string) {
    const todo = todos.find((t) => t.id === id);
    if (todo) toggleMutation.mutate({ id, completed: !todo.completed });
  }

  function deleteTodo(id: string) {
    deleteMutation.mutate(id);
  }

  function editTodo(id: string, title: string, description: string, timeRange: string) {
    editMutation.mutate({ id, title, description, timeRange });
  }

  function refresh() {
    queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
  }

  return {
    filteredTodos,
    totalCount: todos.length,
    completedCount: todos.filter((t) => t.completed).length,
    searchQuery,
    activeTab,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setSearchQuery,
    setActiveTab,
    refresh,
  };
};

export default useTodos;