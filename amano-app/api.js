const APIA = 'http://192.168.0.22:3000/articulos'
const APICli = 'http://192.168.0.22:3000/clientes'
import {encodePassword} from './components/clientes';
import { useState, useEffect } from 'react';



let token = null;
const setToken = newToken =>{
    token = 'Bearer ' + newToken
}


export const getArticulos = async () => {
    const res = await fetch(APIA)
    return await res.json()
}


export const useLogin = (email, password) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(null);

    const body = {email: email, password: password}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({t: body})
    }

   const login = () => {
        setLoading(true)
        fetch(APICli + '/login', options)
            .then((response) => response.json())
            .then((data) => 
                setToken(data.authToken),
                setData("OK")
                )
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }

    return {data, loading, error, login };
}

export const useRegistro = (user) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState(null);

    const body = encodePassword({data: user})
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({t: body})
    }

   const registro = () => {
        setLoading(true)
        fetch(APICli + '/register', options)
            .then((response) => response.json())
            .then((data) => setData(data.errorMessage))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }

    return {data, loading, error, login, registro };
}

