import React from 'react';


const ChecklistItem: React.FC<{ text: string }> = ({ text }) => (
    <figure className="flex items-center space-x-3 text-gray-700">
        <svg aria-hidden="true" className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <figcaption>{text}</figcaption>
    </figure>
);


interface PriceBoxProps {
    price: string;
    description: string;
    features: string[]; 
}


export function PriceBox({ price, description, features }: PriceBoxProps) {
   return (
        <article className="border border-gray-300 p-6 rounded-lg bg-white shadow-md">

            
            <hgroup className="text-4xl font-extrabold text-gray-900 mb-2">
                {price}
            </hgroup>

            
            <p className="text-sm text-gray-500 mb-6">
                {description}
            </p>
            
            <section className="space-y-4 mb-8">
            
                <menu role="list">
                    {features.map((feature, index) => (
                        <li key={index}>
                            <ChecklistItem text={feature} />
                        </li>
                    ))}
                </menu>
            </section>
            
            <button 
                type="button"
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg text-lg 
                            hover:bg-white hover:text-black transition duration-150 shadow-md hover:shadow-none hover:border hover:border-gray-300 cursor-pointer"
            >
                Join Now
            </button>
        </article>
    );
}