import React from 'react';
export default(
    ({text, mode, onClick}) => 
    <li> <button onClick={onClick} id={mode}> {text} </button> </li>
);