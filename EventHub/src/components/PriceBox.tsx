import React from 'react';


const ChecklistItem: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center space-x-3 text-gray-700">
        <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>{text}</span>
    </div>
);


interface PriceBoxProps {
    price: string;
    description: string;
    features: string[]; 
}


export const PriceBox: React.FC<PriceBoxProps> = ({ price, description, features }) => (
    <div className="border p-6 rounded-lg bg-white shadow-md">

      
        <div className="text-4xl font-extrabold text-gray-900 mb-2">
            {price}
        </div>

      
        <p className="text-sm text-gray-500 mb-6">
            {description}
        </p>
        
        <div className="space-y-4 mb-8">
           
            {features.map((feature, index) => (
                <ChecklistItem key={index} text={feature} />
            ))}
        </div>
        
        <button 
            className="w-full bg-black text-white font-bold py-3 rounded-lg text-lg 
                       hover:bg-white hover:text-black transition duration-150 shadow-md hover:shadow-none hover:border hover:border-gray-300 cursor-pointer"
        >
            Join Now
        </button>
    </div>
);

