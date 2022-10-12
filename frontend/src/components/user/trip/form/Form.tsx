import React from 'react';
import './Form.scss';

export default function Form() {
  return (
    <div>
        <div className='search-form'>
            <form className='form'>    
                <h1>Your trip</h1>
                <label>
                    <input type="text" name="origin" placeholder='Origin' ></input>
                </label>
                <label>
                    <input type="text" name="destination" placeholder='Destination' ></input>
                </label>
                <label>
                    <label className='date-label'>Date</label>
                    <input type="date" name="date" placeholder='Date' ></input>
                </label>
                <label>
                    <input type="text" name="vehículo" 
                    placeholder='COMPONENTE DE LOS VEHÍCULOS' ></input>
                </label>
                <label>
                    <input type="text" name="n-passengers" placeholder='Nº of passengers'></input>
                </label>
                <button>Search</button>
            </form>
        </div>
    </div>
  );
}
