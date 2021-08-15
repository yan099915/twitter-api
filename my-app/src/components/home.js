import React from 'react'
import ReactJson from 'react-json-view'
import './home.css'
import image from '../logo.png'
import { useForm } from "react-hook-form";
import { useState } from 'react'

const Home = ()=> {
    const [initialState, setInitialState] = useState([])
    const { register, handleSubmit } = useForm();
    let url = "";
    let count = 10;
    let onSubmit = result  => {
        if(url === ""){
            let myArray = Object.values(result);
            url = myArray[0];
            count = myArray[1];
        }

        // prepare data for request
        let details = {
            'url': url,
            'count': count
        };
        let data = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            data.push(encodedKey + "=" + encodedValue);
        }
        data = data.join("&")

        // http request into back end API
        fetch('http://localhost:3001/app',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: data
        }).then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
        url = "";
    }

    return(
        <div className="container">
            <div className="header">
                <img src={image} alt="logo" className="logo" />
                <form onSubmit={handleSubmit(onSubmit)}>
                <input className="search" placeholder=" Search ex: https://twitter.com/NVIDIAGeForce" {...register("url", { required: true })}/>
                <select className="count" {...register("count")}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <input className="submit" type="submit" value="Search"/>
                </form>
            </div>
            <div className="content">
                <ReactJson src={initialState} theme="solarized" />
            </div>
        </div>
    )
}

export default Home