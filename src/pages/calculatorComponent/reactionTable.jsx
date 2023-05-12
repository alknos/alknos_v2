import React from 'react';

const ReactionTable = ({ estequiometricos, compuestos }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
            Compound
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
            Grams
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
            Moles
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
            Molecules
          </th>
        </tr>
      </thead>
      <tbody>
        {estequiometricos.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              {compound[index].compound}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              {item.grams}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              {item.moles}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              {item.molecules}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReactionTable;

