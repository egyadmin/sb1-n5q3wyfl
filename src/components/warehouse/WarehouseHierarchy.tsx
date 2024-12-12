import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse as WarehouseIcon, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import type { Warehouse } from '../../types/warehouse';
import { mockWarehouses } from '../../data/mockWarehouses';

interface WarehouseNodeProps {
  warehouse: Warehouse;
  level?: number;
  onSelect: (warehouse: Warehouse) => void;
}

const WarehouseNode: React.FC<WarehouseNodeProps> = ({ warehouse, level = 0, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const subWarehouses = mockWarehouses.filter(w => w.parentWarehouseId === warehouse.id);
  const hasChildren = subWarehouses.length > 0;

  return (
    <div className="ml-4">
      <div 
        className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
          level === 0 ? 'bg-blue-50' : ''
        }`}
        onClick={() => onSelect(warehouse)}
      >
        <div className="p-2 rounded-lg bg-blue-100 mr-2">
          <WarehouseIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{warehouse.name}</h3>
          <p className="text-sm text-gray-500">{warehouse.type === 'main' ? 'رئيسي' : 'فرعي'}</p>
        </div>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div className="mt-2 space-y-2">
          {subWarehouses.map((subWarehouse) => (
            <WarehouseNode
              key={subWarehouse.id}
              warehouse={subWarehouse}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function WarehouseHierarchy() {
  const navigate = useNavigate();
  const mainWarehouses = mockWarehouses.filter(w => w.type === 'main');

  const handleWarehouseSelect = (warehouse: Warehouse) => {
    navigate(`/warehouses/${warehouse.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">هيكل المستودعات</h2>
        <button
          onClick={() => navigate('/warehouses/new')}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Plus className="w-4 h-4 ml-1" />
          إضافة مستودع
        </button>
      </div>

      <div className="space-y-4">
        {mainWarehouses.map((warehouse) => (
          <WarehouseNode
            key={warehouse.id}
            warehouse={warehouse}
            onSelect={handleWarehouseSelect}
          />
        ))}
      </div>
    </div>
  );
}