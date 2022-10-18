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
        <div className='search-form'>
            <h1>Your trip</h1>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>    
                <label className="top-input">
                    <input  type="text" placeholder='Origin' {...register("origin")}></input>
                </label>
                <label>
                    <input type="text" placeholder='Destination' {...register("destination")}></input>
                </label>
                <label className='double-line'>
                    <input type="date" placeholder='Date' {...register("date")} ></input>
                    <input type="number" placeholder='Passengers' {...register("passenger_number")}></input>
                </label>
                <label>
                    <input type="text" className='bottom-input'
                    placeholder='COMPONENTE DE LOS VEHÍCULOS' {...register("vehicle")}></input>
                </label>
                <button>Search</button>
            </form>
        </div>
  );
}
