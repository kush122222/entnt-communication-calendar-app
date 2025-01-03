import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationPanel = ({ companies = [] }) => {
  useEffect(() => {
    const overdueCompanies = companies.filter(
      (company) =>
        Array.isArray(company.lastCommunications) &&
        company.lastCommunications.some(
          (communication) => new Date(communication.date) < new Date()
        )
    );

    if (overdueCompanies.length > 0) {
      toast.info(
        `You have overdue communications with ${overdueCompanies.length} company(ies)!`,
        { position: 'top-right' }
      );
    }
  }, [companies]);

  const overdueCompanies = companies
    .map((company) => {
      const overdueCommunications = Array.isArray(company.lastCommunications)
        ? company.lastCommunications.filter(
            (communication) => new Date(communication.date) < new Date()
          )
        : [];
      return overdueCommunications.length > 0
        ? { name: company.name, overdueCommunications }
        : null;
    })
    .filter(Boolean);

  const todayCompanies = companies
    .map((company) => {
      const todayCommunications = Array.isArray(company.lastCommunications)
        ? company.lastCommunications.filter(
            (communication) =>
              new Date(communication.date).toDateString() === new Date().toDateString()
          )
        : [];
      return todayCommunications.length > 0
        ? { name: company.name, todayCommunications }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Company Notifications</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold">Overdue Communications</h2>
          {overdueCompanies.length > 0 ? (
            overdueCompanies.map((company, index) => (
              <div key={index} className="bg-red-100 p-2 rounded mb-2">
                <strong>{company.name}</strong>
                {company.overdueCommunications.map((communication, idx) => (
                  <div key={idx}>
                    <span>
                      - Last Communication: {new Date(communication.date).toLocaleDateString()} - Due{' '}
                      {Math.ceil((new Date() - new Date(communication.date)) / (1000 * 3600 * 24))} days ago
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No overdue communications</div>
          )}
        </div>
        <div>
          <h2 className="font-bold">Today's Communications</h2>
          {todayCompanies.length > 0 ? (
            todayCompanies.map((company, index) => (
              <div key={index} className="bg-yellow-100 p-2 rounded mb-2">
                <strong>{company.name}</strong>
                {company.todayCommunications.map((communication, idx) => (
                  <div key={idx}>
                    <span>- Communication: {new Date(communication.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No communications for today</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
