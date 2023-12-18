import React from 'react';
import { connect } from 'react-redux';
import { removeTodo } from '../actions';

const TodoList = ({ todos, dispatch }) => {
  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ backgroundColor: getLightColor(), marginBottom: '5px', padding: '10px' }}>
            <span style={{ marginRight: '10px', display: 'inline-block' }}>{todo.text}</span>
            <button onClick={() => handleRemove(todo.id)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getLightColor = () => {
  const letters = 'ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(TodoList);
