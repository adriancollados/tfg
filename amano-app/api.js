const APIA = 'http://192.168.0.22:3000/articulos'
const APICli = 'http://192.168.0.22:3000/clientes'
import {encodePassword} from './components/clientes';
import { useState, useEffect } from 'react';


export const getArticulos = async () => {
    const res = await fetch(APIA)
    return await res.json()
}


export const useLogin = (email, password) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(null);

    const body = encodePassword({email: email, password: password})
    console.log("Body: " + body)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({t: body})
    }

    console.log("Options: " + JSON.stringify(options))

   const login = () => {
        setLoading(true)
        fetch(APICli + '/login', options)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch(error => error)
            .finally(() => setLoading(false))
    }

    return {data, loading, error, login };
}


