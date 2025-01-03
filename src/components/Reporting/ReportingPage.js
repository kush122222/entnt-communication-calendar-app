import React from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Heatmap from './Heatmap';
import ExportButton from './ExportButton';
import ActivityLog from './ActivityLog';

const ReportingPage = () => {
  const barData = [
    { label: 'LinkedIn', value: 12 },
    { label: 'Email', value: 8 },
    { label: 'Calls', value: 5 },
  ];

  const pieData = [
    { label: 'Successful', value: 60 },
    { label: 'Pending', value: 30 },
    { label: 'Failed', value: 10 },
  ];

  const heatmapData = [
    { date: '2024-12-01', count: 3 },
    { date: '2024-12-02', count: 1 },
    { date: '2024-12-03', count: 4 },
  ];

  const reportData = [
    { field1: 'LinkedIn', field2: '12', field3: 'Successful' },
    { field1: 'Email', field2: '8', field3: 'Pending' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reporting and Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <BarChart data={barData} />
        </div>
        <div className="border rounded p-4">
          <PieChart data={pieData} />
        </div>
        <div className="border rounded p-4">
          <Heatmap data={heatmapData} />
        </div>
        <div className="border rounded p-4">
          <ExportButton data={reportData} />
        </div>
      </div>
      <div className="mt-4 border rounded p-4">
        <ActivityLog apiUrl="/api/activity" />
      </div>
    </div>
  );
};

export default ReportingPage;
