import React from 'react';
import './HistoryEvents.css';

const HistoryEvents = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Get current date MM-DD
  const today = new Date();
  const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Filter events that happened on this day in history
  const todayEvents = data.filter(event => {
    if (!event.event_date) return false;
    // Assume event_date is YYYY-MM-DD
    const parts = event.event_date.split('-');
    if (parts.length === 3) {
      const eventMonthDay = `${parts[1]}-${parts[2]}`;
      return eventMonthDay === currentMonthDay;
    }
    return false;
  });

  // If no events today, get top 5 by view_count
  let displayEvents = todayEvents;
  let sectionTitle = "Today's event";

  if (displayEvents.length === 0) {
    displayEvents = [...data]
      .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
      .slice(0, 5);
    sectionTitle = "Top View Events";
  }

  return (
    <aside className="widget-container history-events-widget">
      <div className="history-header">
        <h3>{sectionTitle}</h3>
      </div>
      
      <div className="history-list">
        {displayEvents.map((event, index) => (
          <div key={`${event.id}-${index}`} className="history-item">
            <div className="history-year">{event.event_year}</div>
            <div className="history-content">
              <h4 className="history-title">{event.title}</h4>
              <p className="history-summary">{event.summary}</p>
              {todayEvents.length === 0 && event.view_count && (
                 <div className="history-stats">{event.view_count.toLocaleString()} views</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default HistoryEvents;
