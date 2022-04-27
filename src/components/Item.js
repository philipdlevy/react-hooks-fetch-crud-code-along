import React from "react";

// Deconstruct the onDeleteItem prop
 // destructure the onUpdateItem prop
function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleDeleteClick() {
    // Call onDeleteItem, passing the deleted item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }
  
  function handleAddToCartClick() {
     // add fetch request
     // Call onUpdateItem, passing the data returned from the fetch request
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
    .then((r) => r.json())
    .then((updatedItem) => onUpdateItem(updatedItem));
  }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      {/* add the onClick listener */}
      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      {/* ... add onClick */}
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
