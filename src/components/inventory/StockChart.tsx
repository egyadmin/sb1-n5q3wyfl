import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'قطع غيار', current: 450, optimal: 500 },
  { category: 'مواد خام', current: 320, optimal: 400 },
  { category: 'مواد تغليف', current: 280, optimal: 300 },
  { category: 'منتجات نهائية', current: 180, optimal: 200 },
];

export default function StockChart() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">مستويات المخزون حسب الفئة</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" name="المستوى الحالي" fill="#3B82F6" />
            <Bar dataKey="optimal" name="المستوى الأمثل" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}