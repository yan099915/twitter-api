import React from 'react'
import ReactJson from 'react-json-view'
import { useEffect, useState } from 'react'

export const Home = ()=> {
    const [initialState, setInitialState] = useState([])
    
    useEffect( async ()=>{
        var details = {
            'url': 'https://twitter.com/elonmusk'
        };
        
        var data = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          data.push(encodedKey + "=" + encodedValue);
        }

        const  response = await fetch('http://localhost:3001/app',{
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
    },[])

    return(<ReactJson style={{textAlign: 'left'}} src={initialState} theme="solarized" />)
}