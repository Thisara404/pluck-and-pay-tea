import React from 'react';
import { formatNumber, formatCurrency } from '@/utils/format';
import { User } from 'lucide-react';

interface TopPluckersProps {
  pluckers: Array<{
    id: string;
    name: string;
    amount: number;
    efficiency: number;
    image?: string | null;
  }>;
  isLoading: boolean;
}

// Fallback data for when real data is loading
const fallbackData = [
  {
    id: 1,
    name: "Mary Johnson",
    amount: 345,
    efficiency: 96,
    image: null,
  },
  {
    id: 2,
    name: "Robert Smith",
    amount: 332,
    efficiency: 94,
    image: null,
  },
  {
    id: 3,
    name: "James Brown",
    amount: 310,
    efficiency: 90,
    image: null,
  },
  {
    id: 4,
    name: "Patricia White",
    amount: 295,
    efficiency: 87,
    image: null,
  },
  {
    id: 5,
    name: "David Lee",
    amount: 290,
    efficiency: 85,
    image: null,
  },
];

const TopPluckers = ({ pluckers = [], isLoading = false }: TopPluckersProps) => {
  // Use provided data or fallback data if empty
  const displayPluckers = pluckers.length > 0 ? pluckers : fallbackData;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Top Performing Pluckers
          {isLoading && <span className="ml-2 text-sm font-normal text-gray-500">(Loading...)</span>}
        </h3>
        <button className="text-sm text-tea-dark hover:text-tea-dark/70">View all</button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Plucker</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Amount (kg)</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayPluckers.map((plucker) => (
              <tr key={plucker.id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="bg-tea-brown/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      {plucker.image ? (
                        <img src={plucker.image} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <span className="text-sm font-medium">{plucker.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="font-medium">{plucker.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-gray-700">{plucker.amount} kg</p>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-tea-dark rounded-full h-2" 
                        style={{ width: `${plucker.efficiency}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{plucker.efficiency}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPluckers;
