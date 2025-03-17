// Imports
import { useEffect, useState } from "react";
import { ListNavigation } from "./ListNavigation.jsx";
import { NewItemForm } from "./NewItemForm.jsx";
import { List } from "./List.jsx";
import "./styles.css";
import { auth } from "../utilities/firebaseConfig.js";
import { LIST_TYPES, fetchItems, storeItem, reorderItems } from "../utilities/database/ListTypes.js";
import { deleteItem } from "../utilities/database/DeleteItem.js";
import { toggleItem } from "../utilities/database/ToggleItem.js";

export default function App() {

  // Hooks
  const [items, setItems] = useState([]);
  const [activeList, setActiveList] = useState(LIST_TYPES.TODO);
  const [loading, setLoading] = useState(true);

  // Authentication Listener
  useEffect(() => {
    const handleAuthStateChange = (user) => {
      if (user) {
        const userId = auth.currentUser.uid;
        fetchAndDisplayItems(userId, activeList);
      } else {
        window.location.href = "index.html";
      }
    };
    const AuthListener = auth.onAuthStateChanged(handleAuthStateChange);
    return () => {
      AuthListener();
    };
  }, []);

  // Fetch Items When List Type Changes
  useEffect(() => {
    if (auth.currentUser) {
      fetchAndDisplayItems(auth.currentUser.uid, activeList);
    }
  }, [activeList]);

  // Fetch All Items For A List Type
  const fetchAndDisplayItems = async (userId, listType) => {
    setLoading(true);
    try {
      const listItems = await fetchItems(userId, listType);
      setItems(listItems);
    } catch (error) {
      console.error(`Error Fetching ${listType} Items:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Adds An Item To The Current List
  async function addItem(title) {
    const userId = auth.currentUser.uid;
    try {
      const highestPosition = items.length > 0 
        ? Math.max(...items.map(item => item.position || 0)) 
        : -1;
      const timestamp = new Date().getTime();
      const newItemData = {
        userId: userId,
        itemText: title,
        completed: false,
        timestamp: timestamp,
        position: highestPosition + 1,
      };
      
      // Create Temporary ID For New Item
      const tempId = `temp-${timestamp}`;
      const newItem = { ...newItemData, id: tempId };
      
      // Update Local State Immediately
      setItems(currentItems => [...currentItems, newItem]);
      
      // Store In Database
      const storedItemId = await storeItem(userId, activeList, title, false);
      
      // Update Temporary Item With Real ID
      if (storedItemId) {
        setItems(currentItems => 
          currentItems.map(item => 
            item.id === tempId ? { ...item, id: storedItemId } : item
          )
        );
      }
    } catch (error) {
      console.error(`Error Adding ${activeList} Item:`, error);
    }
  }

  // Deletes An Item From The Current List
  function deleteListItem(id) {
    const userId = auth.currentUser.uid;
    try {
      deleteItem(userId, `${activeList}-list-${userId}`, id);
      setItems((currentItems) => currentItems.filter(item => item.id !== id));
    } catch (error) {
      console.error(`Error Deleting ${activeList} Item:`, error);
    }
  }

  // Toggles Item Checkbox
  function toggleListItem(id, completed) {
    const userId = auth.currentUser.uid;
    try {
      toggleItem(userId, `${activeList}-list-${userId}`, id, !completed);
      setItems((currentItems) => {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, completed: !completed };
          }
          return item;
        });
      });
    } catch (error) {
      console.error(`Error Toggling ${activeList} Item:`, error);
    }
  }

  // Reorder Items After Drag And Drop
  function reorderItemsList(newItems) {
    const userId = auth.currentUser.uid;
    try {
      setItems(newItems);
      reorderItems(userId, activeList, newItems);
    } catch (error) {
      console.error(`Error Reordering ${activeList} Items:`, error);
    }
  }

  // Get The Appropriate Title Based On The List Type
  const getListTitle = () => {
    switch(activeList) {
      case LIST_TYPES.TODO:
        return "Todo List";
      case LIST_TYPES.GROCERY:
        return "Grocery List";
      case LIST_TYPES.WISHLIST:
        return "Wish List";
      default:
        return "Items";
    }
  };

  // Returns the JSX Component
  return (
    <div className="app-container">
      <ListNavigation 
        activeList={activeList} 
        setActiveList={setActiveList} 
      />
      
      <h1 className="header">{getListTitle()}</h1>
      
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <List 
            items={items} 
            toggleItem={toggleListItem} 
            deleteItem={deleteListItem}
            reorderItems={reorderItemsList}
            listType={activeList}
          />
          <NewItemForm 
            onSubmit={addItem}
            listType={activeList}
          />
        </>
      )}
    </div>
  );
}
