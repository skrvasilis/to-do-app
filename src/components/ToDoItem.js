import React from "react";

// destructuring the props with {}
export default function ToDoItem({taskProps, updateItemProps, deleteItem}) {
  return (
    <div className="todo-item">
      <p> {taskProps.text}</p>
      <div className="action">
        <button className="btn" onClick={()=>updateItemProps(taskProps.id)}>&#10004;</button>
        <button
          className="btn"
          onClick={() =>deleteItem(taskProps.id)}
        >
          &#128465;
        </button>
      </div>
    </div>
  );
}
