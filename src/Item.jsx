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

  // Touch hHandling For Mobile Devices
  const handleTouchStart = (e) => {
    if (e.target.classList.contains('drag-handle')) {
      e.preventDefault();
      onDragStart(index);
    }
  };
  const handleTouchMove = (e) => {
    if (dragItem.current !== null) {
      e.preventDefault();
      const touch = e.touches[0];
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
      const listItem = elements.find(el => el.tagName === 'LI');
      if (listItem) {
        const itemIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
        if (itemIndex !== -1) {
          onDragOver(itemIndex);
        }
      }
    }
  };
  const handleTouchEnd = (e) => {
    if (dragItem.current !== null) {
      e.preventDefault();
      onDrop();
    }
  };

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-index={index}
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
