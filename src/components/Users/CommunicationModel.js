import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CommunicationModal = ({ onClose, logCommunication }) => {
  const [formData, setFormData] = useState({
    type: '',
    date: new Date(),
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logCommunication(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold">Log New Communication</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          >
            <option value="">Select Type</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
          </select>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            className="border p-2 w-full mb-2"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="border p-2 w-full mb-2"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationModal;
