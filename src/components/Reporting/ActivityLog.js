import React, { useEffect, useState } from 'react';

const ActivityLog = ({ apiUrl, maxRecords = 3 }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      // Replace this with a real API call if needed
      const data = [
        { id: 1, activity: 'User logged in', timestamp: '2024-12-30 10:00' },
        { id: 2, activity: 'User updated profile', timestamp: '2024-12-30 11:00' },
        { id: 3, activity: 'User logged out', timestamp: '2024-12-30 12:00' },
        { id: 4, activity: 'User uploaded a file', timestamp: '2024-12-30 13:00' },
      ];
      setActivities(data.slice(0, maxRecords)); // Limit to maxRecords
    };

    fetchData();
  }, [apiUrl, maxRecords]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Activity Log</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Activity</th>
            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{activity.id}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.activity}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLog;
