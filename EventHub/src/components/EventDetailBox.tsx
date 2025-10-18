import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';


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
            
            <div className="detail-item detail-date-col flex items-center mr-6">
              <CalendarIcon className="w-5 h-5 text-gray-600 mr-2" />
              <p className="font-medium detail-text">{props.date}</p>
            </div>

            <div className="detail-item detail-time-col flex items-center">
              <ClockIcon className="w-5 h-5 text-gray-600 mr-2" />
              <p className="detail-text font-medium">{props.time}</p>
            </div>
          </div>
        

          <div className="flex justify-between w-full"> 
            <div className="detail-item detail-date-col w-full md:w-1/2 mb-4 md:mb-0">
              <div className="flex items-start"> 
                <MapPinIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                    <div>
                      <p className="detail-heading font-medium">{props.locationName}</p>
                      <p className="detail-subtext">
                          {props.address.split('\n').map((line, index) => (
                              <React.Fragment key={index}>{line}<br/></React.Fragment>
                          ))}
                      </p>
                  </div>
              </div>
            </div>

          
            <div className="detail-item detail-date-col w-full md:w-1/2">
              <div className="flex items-start"> 
                <UsersIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="detail-heading font-medium">{props.organizerName}</p>
                    <p className="detail-subtext">{props.organizerDetails}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
     
    
};

export default EventDetailBox;
