import React from 'react';

interface EventDescriptionProps {
  title: string;
  content: string[]
}

export default function EventDescription({title, content}: EventDescriptionProps) {
  return (
    <div className="mt-8 p-6">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {title}
      </h2>
      
      {content.map((paragraph, index) => (
        <p key={index} className="text-base text-gray-700 leading-relaxed mb-4"> 
          {paragraph}
        </p>
      ))}
            
    </div>

    

    
  )
}






