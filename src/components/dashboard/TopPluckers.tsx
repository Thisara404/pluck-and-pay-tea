
import React from 'react';
import { User } from 'lucide-react';

// Sample pluckers data
const pluckers = [
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

const TopPluckers = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Top Performing Pluckers</h3>
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
            {pluckers.map((plucker) => (
              <tr key={plucker.id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="bg-tea-brown/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-tea-brown" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{plucker.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-gray-700">{plucker.amount} kg</p>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-tea-dark h-2.5 rounded-full" style={{ width: `${plucker.efficiency}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-700">{plucker.efficiency}%</span>
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
