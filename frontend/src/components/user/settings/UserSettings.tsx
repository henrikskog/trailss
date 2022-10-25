import React, { useState } from 'react';
import './UserSettings.scss';

export default function UserSettings() {

  return (
    <div className='user-settings'>
        <div className='change-user'>
            <h4>Change username</h4>
            <input type="text" placeholder='username'/>
        </div>
        <div className='change-password'>
            <h4>Change password</h4>
            <input type="password" placeholder='password'/>
        </div>
        <div>
          <button>Save</button>
        </div>
    </div>
  );
}
