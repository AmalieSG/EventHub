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

export default function EventDetailBox(props: EventDetailBoxProps) {
  
    return (
    
      <div className="border border-gray-300 p-6 rounded-lg bg-white shadow-md">
        
        <div className="event-details-container">
          <h1 className="text-2xl font-medium text-left mb-6 text-gray-800">
                Event Details
          </h1>

          <div className="flex justify-around flex-wrap pb-4 mb-4 border-b border-gray-200">
            
            <div className="detail-item w-full sm:w-1/2 mb-4 pr-4">
              <div className="flex items-start">
                <CalendarIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="font-medium text-sm text-gray-700">{props.date}</p>
              </div>
            </div>

            <div className="detail-item w-full sm:w-1/2 mb-4 pr-4">
              <div className="flex items-start">
                <ClockIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="font-medium text-sm text-gray-700">{props.time}</p>
              </div>
            </div>
            
          </div>
        

          <div className="flex flex-wrap justify-around "> 

            <div className="detail-item w-full sm:w-1/2 mb-4 pr-4">
              <div className="flex items-start"> 
                <MapPinIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{props.locationName}</p>
                      <p className="text-sm text-gray-600 mt-2">
                          {props.address.split('\n').map((line, index) => (
                              <React.Fragment key={index}>{line}<br/></React.Fragment>
                          ))}
                      </p>
                  </div>
              </div>
            </div>

          
            <div className="detail-item w-full sm:w-1/2 mb-4 pr-4">
              <div className="flex items-start"> 
                <UsersIcon className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{props.organizerName}</p>
                    <p className="text-sm text-gray-600 mt-2">{props.organizerDetails}</p>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
     
    
};
