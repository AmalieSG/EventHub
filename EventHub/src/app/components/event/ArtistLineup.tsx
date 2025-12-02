export type Artist = {
    name: string;
    description: string;
    role: string;
};

interface ArtistLineupProps {
    artists: Artist[];
}

export function ArtistLineup({ artists }: ArtistLineupProps) {
    return (
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Artist Lineup</h2>
            <ul className="space-y-8">
                {artists.map((artist, index) => (
                    <li key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 size-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                            {artist.name.charAt(0)}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-gray-900">{artist.name}</h3>
                            <p className="text-sm font-medium text-indigo-600 mb-1 uppercase tracking-wider">{artist.role}</p>
                            <p className="text-gray-600">{artist.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};


