import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {

  if ('shoppinglist' in localStorage) {} else {
  localStorage.setItem('shoppinglist', JSON.stringify([]));
}
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  const [newItem, setNewItem] = useState("")
  const [search, setSearch] = useState("")

  const setAndSaveItems = (newItems) =>{
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
    }
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = {
      id: id,
      checked: false,
      item: item
    }
    const updatedItems = [...items, myNewItem]
    setAndSaveItems(updatedItems);
  }
  const handleCheck = (id) => { 
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setAndSaveItems(updatedItems);

  }

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setAndSaveItems(updatedItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) { return }
    addItem(newItem);
    setNewItem("")
  }


  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit} />
        <SearchItem
        search = {search}
        setSearch = {setSearch}
        />
      <Content
        items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete} />
      <Footer lenght={(items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))).length} />
    </div>
  );
}

export default App;
