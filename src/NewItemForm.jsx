// Imports
import { useState } from "react";
import { LIST_TYPES } from '../utilities/database/ListTypes';

export function NewItemForm({ onSubmit, listType }) {

    // Hooks
    const [newItem, setNewItem] = useState("");

    // Form Submission Handler
    function handleSubmit(e) {
        e.preventDefault();
        if(newItem === "") return;

        onSubmit(newItem);
        setNewItem("");
    }
    
    // Get The Appropriate Placeholder Text Based On List Type
    const getPlaceholderText = () => {
        switch(listType) {
            case LIST_TYPES.TODO:
                return "New task to do...";
            case LIST_TYPES.GROCERY:
                return "New grocery item...";
            case LIST_TYPES.WISHLIST:
                return "New wish item...";
            default:
                return "New item...";
        }
    };

    // Get The Appropriate Button Text Based On List Type
    const getButtonText = () => {
        switch(listType) {
            case LIST_TYPES.TODO:
                return "Add Task";
            case LIST_TYPES.GROCERY:
                return "Add Item";
            case LIST_TYPES.WISHLIST:
                return "Add to Wishlist";
            default:
                return "Add";
        }
    };

    // Returns The JSX Component
    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label className="form-label">
                    {listType === LIST_TYPES.TODO ? "New Task" : 
                     listType === LIST_TYPES.GROCERY ? "New Grocery Item" : 
                     "New Wish Item"}
                </label>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item"
                    placeholder={getPlaceholderText()}
                />
            </div>
            <button className="btn">{getButtonText()}</button>
        </form>
    );
}
