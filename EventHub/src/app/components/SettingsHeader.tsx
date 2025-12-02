import { Cog6ToothIcon } from '@heroicons/react/24/outline'; 

export const SettingsHeader = () => {
  return (
    
    <figure className="px-8 py-6 border-b border-gray-200 bg-gray-100 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <hgroup className="flex items-center space-x-3">
            
            <Cog6ToothIcon className="w-8 h-8 text-gray-700" />
            
            <figcaption>
                <h1 className="text-xl font-bold text-gray-900">
                    Settings
                </h1>
                <p className="text-sm text-gray-500">
                    Manage your account and preferences
                </p>
            </figcaption>
        </hgroup>
    </figure>
  );
};
