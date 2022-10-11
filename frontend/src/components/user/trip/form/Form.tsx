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
                <button>Search</button>
            </form>
        </div>
    </div>
  );
}
