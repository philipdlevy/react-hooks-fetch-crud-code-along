import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Update state by passing the array of items to setItems 
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((items) => setItems(items));
  }, [])

  // callback function for deleting item button
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // callback function for adding a new item in itemform
  function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem);
    setItems([...items, newItem]);
  }

  // callback function for adding to cart in item
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* pass updateitem  & handledeletebutton callback as a prop to Item */}
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
