const API = 'http://10.0.2.2:3000/articulos'

const getArticulos = async () => {
    const res = await fetch(API)
    return await res.json()
}