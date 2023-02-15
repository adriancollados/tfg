const API = 'http://192.168.0.22:3000/articulos'

export const getArticulos = async () => {
    const res = await fetch(API)
    return await res.json()
}


