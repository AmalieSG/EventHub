import React from 'react';


interface EventDetailBoxProps {
  date: string;
  time: string;
  locationName: string;
  address: string;
  organizerName: string;
  organizerDetails: string;
}

const EventDetailBox: React.FC<EventDetailBoxProps> = (props) => {
  
    return (
      <div className="border p-6 rounded-lg bg-white shadow-md">
        <img
          src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amF6enxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"/>
        <div className="event-details-container">
          
          <h3 className="detail-header">Event Details</h3>

          <div className="detail-row">
            
            <div className="detail-item detail-date-col">
              <span className="icon">🗓️</span>
              <p className="detail-text">{props.date}</p>
            </div>

            <div className="detail-item detail-time-col">
              <span className="icon">🕒</span>
              <p className="detail-text">{props.time}</p>
            </div>
          </div>

          <div className="detail-row">
            
            <div className="detail-item detail-location-col">
              <span className="icon">📍</span>
              <p className="detail-heading">{props.locationName}</p>
              <p className="detail-subtext">
                {props.address.split('\n').map((line, index) => (
                  <React.Fragment key={index}>{line}<br/></React.Fragment>
                ))}
              </p>
            </div>

            <div className="detail-item detail-organizer-col">
              <span className="icon">👤</span>
              <p className="detail-heading">{props.organizerName}</p>
              <p className="detail-subtext">{props.organizerDetails}</p>
            </div>
          </div>
        </div>
      </div>
    );
     
    
};

export default EventDetailBox;
