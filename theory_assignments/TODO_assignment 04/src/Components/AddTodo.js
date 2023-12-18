import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, marginRight: '5px', padding: '5px' }}
      />
      <button onClick={handleAddTodo} style={{ padding: '5px' }}>
        Add Todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
