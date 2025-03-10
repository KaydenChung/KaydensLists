// Imports
import { useRef } from "react";
import { Item } from "./Item.jsx";

export function List({ 
  items, 
  toggleItem, 
  deleteItem, 
  reorderItems,
  listType 
}) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Handle Drag Start
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  // Handle Dragging Over Another Item
  const handleDragOver = (index) => {
    dragOverItem.current = index;
  };

  // Handle Drop To Reorder Items
  const handleDrop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newItems = [...items];
      const draggedItem = newItems[dragItem.current];
      
      // Remove Dragged Item
      newItems.splice(dragItem.current, 1);
      
      // Insert At New Position
      newItems.splice(dragOverItem.current, 0, draggedItem);
      
      // Update State And Database
      reorderItems(newItems);
      
      // Reset Refs
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };
    
  // Returns The JSX Component
  return (
    <ul className="list">
      {items.length === 0 && "No Items"}
      {items.map((item, index) => {
        return (
          <Item
            {...item}
            key={item.id}
            toggleItem={toggleItem}
            deleteItem={deleteItem}
            index={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            dragItem={dragItem}
            listType={listType}
          />
        );
      })}
    </ul>
  );
}
