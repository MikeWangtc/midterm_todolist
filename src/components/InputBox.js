import React from 'react';
export default(({onKeyUp}) => 
    <input 
        className="todo-app__input"
        placeholder="What needs to be done?"
        onKeyUp={onKeyUp}
    />
)
