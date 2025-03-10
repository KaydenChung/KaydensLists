// Imports
import { useRef } from "react";

export function Item({ 
  completed, 
  id, 
  itemText, 
  toggleItem, 
  deleteItem,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  dragItem,
  listType
}) {
  const itemRef = useRef(null);

  return (
    <li 
      ref={itemRef}
      className={dragItem?.current === index ? "dragging" : ""}
      draggable={true}
      onDragStart={(e) => onDragStart(index)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      <div className="drag-handle" title="Drag to reorder">
        ≡
      </div>
      <label>
        <input 
          type="checkbox" 
          checked={completed}
          onChange={e => toggleItem(id, completed)}
        />
        {itemText}
      </label>
      <div className="item-buttons">
        <button
          onClick={() => deleteItem(id)}
          className="btn btn-danger"
          title="Delete item"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
