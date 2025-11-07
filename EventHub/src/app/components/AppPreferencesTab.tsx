import React, { useState } from 'react';
import { Sun, Moon, Languages, Volume2 } from 'lucide-react';

export const AppPreferencesTab = () => {
  const [theme, setTheme] = useState('System');
  const [language, setLanguage] = useState('Norsk (Bokmål)');
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <main className="py-8 sm:p-6 shadow-xl bg-white rounded-2xl max-w-7xl mx-auto border border-gray-100">
                 
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 border-b pb-4">App Preferences</h2>
      <p className="text-gray-600 mb-8">Customize the app's appearance, language, and sound settings for a better experience.</p>

     
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-xl bg-white">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            {theme === 'Dark' ? <Moon className="w-6 h-6 text-emerald-600" /> : <Sun className="w-6 h-6 text-emerald-600" />}
            <div>
              <p className="font-semibold text-gray-800">Theme</p>
              <p className="text-sm text-gray-500">Choose between light, dark, or system-controlled theme.</p>
            </div>
          </div>
          <div className="flex space-x-2 text-sm">
            {['Light', 'Dark', 'System'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`py-2 px-4 rounded-full font-medium transition-colors duration-200
                  ${theme === t
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-indigo-100'
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

       
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-xl bg-white">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <Languages className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="font-semibold text-gray-800">Language</p>
              <p className="text-sm text-gray-500">Set preferred language.</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-700"
          >
            <option>Norwegian (bokmaal)</option>
            <option>Norwegian (Nynorsk)</option>
            <option>English (US)</option>
            <option>Swedish</option>
          </select>
        </div>


        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="font-semibold text-gray-800">Sound Notifications</p>
              <p className="text-sm text-gray-500">Turn sounds for alerts and interactions on or off.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
          </label>
        </div>

      </div>
    </main>
  );
};


