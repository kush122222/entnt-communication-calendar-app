import React, { useState, useEffect } from 'react';
import {
  addCommunicationMethod,
  updateCommunicationMethod,
} from '../services/api';

const CommunicationMethodForm = ({ onClose, fetchMethods, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    mandatory: false,
    sequence: '',
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const methodData = {
      name: formData.name,
      mandatory: formData.mandatory,
      sequence: formData.sequence,
    };

    if (initialData) {
      await updateCommunicationMethod(initialData.id, methodData);
    } else {
      await addCommunicationMethod(methodData);
    }

    fetchMethods();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {initialData ? 'Edit Communication Method' : 'Add Communication Method'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Method Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="mandatory"
                checked={formData.mandatory}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Mandatory</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sequence
            </label>
            <input
              type="number"
              name="sequence"
              value={formData.sequence}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationMethodForm;
