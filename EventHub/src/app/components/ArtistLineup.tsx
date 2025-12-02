import React from "react";
import { SparklesIcon } from '@heroicons/react/24/solid';

export interface Artist {
    name: string;
    description: string;
    role: 'Headliner' | 'Special Guest' | 'Opening Act';
}

interface ArtistLineupProps {
    artists: Artist[];
}

export default function ArtistLineup({ artists }: ArtistLineupProps) {
    return (
        <section className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl p-6 font-bold text-gray-800 exmb-6 flex items-center">
                <SparklesIcon className="w-6 h-6 text-indigo-600 mr-2" />
                Lineup & Performers
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {artists.map((artist, index) => (
                <li key={index} className="flex items-start">
                    <figure className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 mr-4 flex items-center justify-center text-sm font-semibold text-gray-600">
                  
                    {artist.role === 'Headliner' ? 'HEAD' : 'ART'}
                    </figure>

                    <article>
                  
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{artist.name}</h3>
                    <p
                        className={`text-xs font-semibold uppercase tracking-wider ${
                        artist.role === 'Headliner' ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                    >
                        {artist.role}
                    </p>

                 
                    <p className="text-sm text-gray-600 mt-1">{artist.description}</p>
                    </article>
                </li>
                ))}
            </ul>
        </section>
    );
};
