import React, { useState } from 'react';
import { Edit2, Trash2, ArrowUpDown } from 'lucide-react';

export function InventoryTable({ items, onEdit, onDelete, onSort }) {
  const [sortField, setSortField] = useState('name');

  const handleSort = (field) => {
    setSortField(field);
    onSort(field);
  };

  const SortButton = ({ field }) => (
    <button
      onClick={() => handleSort(field)}
      className="inline-flex items-center hover:text-blue-400"
    >
      <ArrowUpDown className="h-4 w-4 ml-1" />
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Name <SortButton field="name" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Category <SortButton field="category" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Quantity <SortButton field="quantity" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Price <SortButton field="price" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Last Updated <SortButton field="lastUpdated" />
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {items.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? 'bg-red-900/30' : 'hover:bg-gray-700/50'}
            >
              <td className="px-6 py-4 text-sm text-gray-200">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-300">{item.category}</td>
              <td className={`px-6 py-4 text-sm ${
                item.quantity < 10 ? 'text-red-400 font-semibold' : 'text-gray-300'
              }`}>
                {item.quantity}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                ₹{item.price.toLocaleString('en-IN')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {new Date(item.lastUpdated).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}