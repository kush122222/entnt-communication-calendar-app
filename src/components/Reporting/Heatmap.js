import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import '../../dist/styles.css';

const Heatmap = ({ data }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Overdue Trends</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
};

export default Heatmap;
