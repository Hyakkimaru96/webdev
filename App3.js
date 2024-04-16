import React, { useState, useEffect } from 'react';
import './App.css';

const abilityList = [
  "Arena Trap",
  "Armor Tail",
  "Aroma Veil",
  "As One",
  "Aura Break",
  "Bad Dreams",
  "Ball Fetch",
  "Battery",
  "Battle Armor",
  "Battle Bond",
  "Beads of Ruin",
  "Beast Boost",
  "Berserk",
  "Big Pecks"
];

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAbilityData = async () => {
      const itemData = [];
    
      for (const abilityName of abilityList) {
        try {
          // Encode the ability name for the URL
          const encodedAbilityName = encodeURIComponent(abilityName.toLowerCase().replace(/\s/g, '-'));
    
          const response = await fetch(`https://pokeapi.co/api/v2/ability/${encodedAbilityName}`);
          
          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`Failed to fetch ability: ${abilityName}`);
          }
    
          const data = await response.json();
          
          // Extracting relevant flavor text entry
          const flavorTextEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
    
          // Pushing the item data to the array
          itemData.push({
            name: abilityName,
            data: flavorTextEntry ? flavorTextEntry.flavor_text : "Data not found"
          });
        } catch (error) {
          console.error(error); // Log the error
          // Push a placeholder item with an error message
          itemData.push({
            name: abilityName,
            data: "Error fetching data"
          });
        }
      }
    
      setItems(itemData);
    };
    

    fetchAbilityData();
  }, []);

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.data}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ItemList />
    </div>
  );
}

export default App;

------------------------------------------------
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div>
      <pre style={{ fontSize: '20px' }}>M Tharun                 22BCE1835                   Q4</pre>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new item"
      />
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDeleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

------------------------------------------------------------
import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  
  const addItem = () => {
    if (itemName !== '' && itemCost !== '') {
      const newItem = {
        name: itemName,
        cost: parseFloat(itemCost)
      };
      setItems([...items, newItem]);
      setItemName('');
      setItemCost('');
    }
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const totalCost = items.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div>
      <h1>Item List</h1>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Item Cost"
        value={itemCost}
        onChange={(e) => setItemCost(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.cost}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalCost}</p>
    </div>
  );
}

export default App;
