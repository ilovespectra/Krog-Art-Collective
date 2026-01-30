'use client';

import { useState } from 'react';
import { inventoryCache } from '@/data/inventory';

export default function POS() {
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [barcode, setBarcode] = useState('');

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim()) {
      setScannedItems([...scannedItems, barcode]);
      setBarcode('');
    }
  };

  const getItemName = (itemId: string) => {
    const item = inventoryCache.find((i) => i.id === itemId);
    return item ? item.name : 'Unknown Item';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="text-3xl">📦</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Point of Sale System
          </h1>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 mb-8 rounded">
          <h2 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            🚀 Coming Soon
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            The Point of Sale system is currently in development. This interface will allow staff to scan inventory items during purchase, automatically updating stock levels and processing transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Barcode Scanner
            </h2>
            <form onSubmit={handleScan} className="space-y-4">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Scan barcode..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled
              />
              <button
                type="submit"
                disabled
                className="w-full px-4 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed opacity-50"
              >
                Scan Item (Disabled)
              </button>
            </form>
          </div>

          {/* Features Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Planned Features
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-xl">📱</span>
                <span>Barcode scanning integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📊</span>
                <span>Real-time inventory updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💳</span>
                <span>Payment processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📈</span>
                <span>Sales analytics dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🧾</span>
                <span>Receipt generation</span>
              </li>
            </ul>
          </div>
        </div>

        {scannedItems.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Scanned Items (Demo)
            </h2>
            <div className="space-y-2">
              {scannedItems.map((itemId, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded"
                >
                  <span>{getItemName(itemId)}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {itemId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
