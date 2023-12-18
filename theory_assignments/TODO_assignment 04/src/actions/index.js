export const addTodo = (text, id) => ({
  type: 'ADD_TODO',
  payload: {
    text,
    id,
  },
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: {
    id,
  },
});

export const removeTodo = (id) => ({
  type: 'REMOVE_TODO',
  payload: {
    id,
  },
});
