// Imports
import React from 'react';
import { LIST_TYPES } from '../utilities/database/ListTypes';

export function ListNavigation({ activeList, setActiveList }) {

  // List Type Definitions
  const listTypes = [
    { id: LIST_TYPES.TODO, label: 'Todo List' },
    { id: LIST_TYPES.GROCERY, label: 'Grocery List' },
    { id: LIST_TYPES.WISHLIST, label: 'Wish List' }
  ];

  // Returns The JSX Component
  return (
    <nav className="list-navigation">
      <ul>
        {listTypes.map((list) => (
          <li key={list.id}>
            <button 
              className={`nav-btn ${activeList === list.id ? 'active' : ''}`}
              onClick={() => setActiveList(list.id)}
            >
              {list.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
