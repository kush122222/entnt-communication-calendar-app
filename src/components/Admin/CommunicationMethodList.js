import React, { useEffect, useState } from 'react';
import {
  getCommunicationMethods,
  deleteCommunicationMethod,
} from '../services/api';
import CommunicationMethodForm from './CommunicationMethodForm';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const CommunicationMethodList = () => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    const { data } = await getCommunicationMethods();
    setMethods(data);
  };

  const handleDelete = async (id) => {
    await deleteCommunicationMethod(id);
    fetchMethods();
  };

  const handleEdit = (method) => {
    setSelectedMethod(method);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Communication Method Management
      </h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
      >
        Add Communication Method
      </button>
      <div className="mt-6">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-4 border">Method</th>
              <th className="p-4 border">Mandatory</th>
              <th className="p-4 border">Sequence</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id} className="text-gray-700 hover:bg-gray-50">
                <td className="p-4 border">{method.name}</td>
                <td className="p-4 border">{method.mandatory ? 'Yes' : 'No'}</td>
                <td className="p-4 border">{method.sequence}</td>
                <td className="p-4 border">
                  <button
                    onClick={() => handleEdit(method)}
                    className="text-blue-500 hover:text-blue-600 mx-1"
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="text-red-500 hover:text-red-600 mx-1"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CommunicationMethodForm
          onClose={() => {
            setShowForm(false);
            setSelectedMethod(null);
          }}
          fetchMethods={fetchMethods}
          initialData={selectedMethod}
        />
      )}
    </div>
  );
};

export default CommunicationMethodList;
