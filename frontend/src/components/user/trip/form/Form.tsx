import React from 'react';
import './Form.scss';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Form() {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const onSubmit = (d : any) => {
        console.log(d)
        console.log(d["origin"])
        console.log(d["destination"])
        console.log(d["date"])
        console.log(d["vehicle"])
        console.log(d["passenger_number"])
        navigate("/normal");
      }


  return (
    <div>
        <div className='search-form'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>    
                <h1>Your trip</h1>
                <label>
                    <input type="text" placeholder='Origin' {...register("origin")}></input>
                </label>
                <label>
                    <input type="text" placeholder='Destination' {...register("destination")}></input>
                </label>
                <label>
                    <label className='date-label'>Date</label>
                    <input type="date" placeholder='Date' {...register("date")} ></input>
                </label>
                <label>
                    <input type="text"
                    placeholder='COMPONENTE DE LOS VEHÍCULOS' {...register("vehicle")}></input>
                </label>
                <label>
                    <input type="text" placeholder='Nº of passengers' {...register("passenger_number")}></input>
                </label>
                <button>Search</button>
            </form>
        </div>
    </div>
  );
}
