import React, { useState } from 'react';
import '../landing/components/TopPage.scss';
import "./SalesPage.scss"
import Login from '../user/auth/login/Login';



export default function CompanyLogin() {
    return (
        <div>
            <Login company/>
        </div>
    );
}
