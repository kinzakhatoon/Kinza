import { v4 as uuidv4 } from 'uuid';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: uuidv4(), text: action.payload.text, completed: false }
      ];

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );

    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);

    default:
      return state;
  }
};

export default todoReducer;
