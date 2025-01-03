import React, { useEffect, useState } from 'react';
import { getCompanies, deleteCompany } from '../services/api';
import CompanyForm from './CompanyForm';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data } = await getCompanies();
    setCompanies(data);
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    fetchCompanies();
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Company Management</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowForm(true)}
      >
        Add Company
      </button>

      <table className="min-w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="border p-2">{company.name}</td>
              <td className="border p-2">{company.location}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(company)}>
                  <AiFillEdit className="text-blue-500 inline-block mx-1" />
                </button>
                <button onClick={() => handleDelete(company.id)}>
                  <AiFillDelete className="text-red-500 inline-block mx-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <CompanyForm
          onClose={() => {
            setShowForm(false);
            setSelectedCompany(null);
          }}
          fetchCompanies={fetchCompanies}
          initialData={selectedCompany}
        />
      )}
    </div>
  );
};

export default CompanyList;
