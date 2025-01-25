import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { InventoryTable } from './components/InventoryTable';
import { InventoryForm } from './components/InventoryForm';

// Sample initial data
const initialItems = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    quantity: 15,
    price: 75000,
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'Desk Chair',
    category: 'Furniture',
    quantity: 8,
    price: 15000,
    lastUpdated: new Date(),
  },
  {
    id: '3',
    name: 'Wireless Mouse',
    category: 'Electronics',
    quantity: 25,
    price: 2500,
    lastUpdated: new Date(),
  },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(items);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let result = [...items];
    
    if (categoryFilter) {
      result = result.filter(item => 
        item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    if (searchQuery) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredItems(result);
  }, [items, categoryFilter, searchQuery]);

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    setItems([...items, item]);
  };

  const handleEditItem = (updatedItem) => {
    if (editingItem) {
      const updated = {
        ...updatedItem,
        id: editingItem.id,
        lastUpdated: new Date(),
      };
      setItems(items.map(item => 
        item.id === editingItem.id ? updated : item
      ));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSort = (field) => {
    const sorted = [...filteredItems].sort((a, b) => {
      if (field === 'lastUpdated') {
        return new Date(b[field]).getTime() - new Date(a[field]).getTime();
      }
      return a[field] < b[field] ? -1 : 1;
    });
    setFilteredItems(sorted);
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-100">
              Inventory Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <InventoryTable
            items={filteredItems}
            onEdit={(item) => {
              setEditingItem(item);
              setShowForm(true);
            }}
            onDelete={handleDeleteItem}
            onSort={handleSort}
          />
        </div>
      </div>

      {showForm && (
        <InventoryForm
          item={editingItem}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

export default App;