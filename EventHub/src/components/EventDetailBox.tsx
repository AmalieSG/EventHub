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
        
        <div className="event-details-container">
          <h1 className="text-2xl font-medium text-left mb-6 text-gray-800">
                Event Details
          </h1>

          <div className="flex justify-around w-full">
            
            <div className="detail-item detail-date-col flex items-center">
              <span className="icon">🗓️</span>
              <p className="detail-text ml-2">{props.date}</p>
            </div>

            <div className="detail-item detail-time-col flex items-center">
              <span className="icon">🕒</span>
              <p className="detail-text ml-2">{props.time}</p>
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
