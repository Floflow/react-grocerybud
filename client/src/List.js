import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {list.map((item) => {
        const { id, name } = item;
        console.log(id);
        return (
          <article key={id} className="grocery-item">
            <p className="grocery-list">{name}</p>
            <div className="btn-container">
              <button
                type="btn"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="btn"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
