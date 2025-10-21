
import React from 'react';
import { SettingsHeader } from '../components/SettingsHeader';
import {SettingsNav} from '../components/SettingsNav';


export const Settings: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div> <SettingsHeader/></div>
     
      <div><SettingsNav/></div>
    </div>
    
  );
}