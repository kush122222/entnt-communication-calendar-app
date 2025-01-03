import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({ companies = [] }) => {
  const events = companies?.flatMap((company) =>
    company.lastCommunications?.map((communication) => ({
      title: `${company.name} - ${communication.type}`,
      start: new Date(communication.date),
      end: new Date(communication.date),
    }))
  );

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: '#e0f7fa',
      color: '#00695c',
      borderRadius: '5px',
      padding: '5px',
      border: 'none',
      fontSize: '0.9em',
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Company Communications Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarView;
