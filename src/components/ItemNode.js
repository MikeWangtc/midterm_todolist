import React from 'react';
export default(
    ({context, id, isDone, onChange_CheckBox, onClick_Deletion}) => {
        let style = { textDecoration :"", opacity :"" };
        if(isDone){
            style.textDecoration = "line-through";
            style.opacity = 0.5;
        }
        return <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input className="todo-item-input" type="checkbox" id={id} checked={isDone} onChange={onChange_CheckBox}/>
                    <label htmlFor={id}/>
                </div>
                <div className="todo-app_item-detail-wrapper">
                    <h1 className="todo-app__item-detail" style={style}> {context} </h1>
                </div>
                <img src="./images/x.png" className="todo-app__item-x" onClick={onClick_Deletion}/>
            </li>
    }
)
