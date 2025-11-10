
import React from 'react';
import { SettingsHeader } from '../components/SettingsHeader';
import {SettingsNav} from '../components/SettingsNav';
import {AccountTab} from '../components/AccountTab';


export function Settings() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div> <SettingsHeader/></div>
     
      <div><SettingsNav/></div>

      <div><AccountTab/> </div>
    </div>
    
  );
}