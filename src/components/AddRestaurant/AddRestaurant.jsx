import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './AddRestaurant.css'

const api = process.env.REACT_APP_API
export default function AddRestaurant() {
    const [names, setNames] = useState([])
    const [restaurante, setRestaurante] = useState('')
    const [option, setOption] = useState('')
    const [direccion, setDireccion] = useState([''])
    const [link, setLink] = useState('')
    useEffect(() => {
        axios.get(api).then((r) => setNames(r.data)).catch((error) => console.log(error))
    }, [])
    function handleName(e) {
        if (e.target.name === 'restaurante') {

            if (e.target.value === "no") {
                setRestaurante('')
            }
            else {
                setRestaurante(e.target.value)
            }
            return
        }
        else if (e.target.name === 'option') {
            setOption(e.target.value)
            return
        }
        else if (e.target.name === 'direccion') {
            setDireccion(e.target.value)
            return
        }
        else if (e.target.name === 'link') {
            setLink(e.target.value)
            return
        }
    }
    async function createRestaurant() {
        let nombre = ''
        if (restaurante === 'otro') {
            nombre = option
        }
        else {
            nombre = restaurante
        }
        let obj = {
            nombre,
            direccion,
            link
        }
        await axios.post(api + "createRestaurant", obj)
        alert("Se ha creado correctamente el Restaurante")
        window.location.href = "/"
    }
    return (
        <div className='addRestaurant'>
            <h1>Agregar nuevo restaurante</h1>
            <div className='restaurant-group'>
                <h3>Selecciona si pertenece a un restaurante ya creado</h3>
                <select onChange={(e) => { handleName(e) }} name='restaurante'>
                    <option onSelected={false} defaultChecked value={"no"}>Selecciona un restaurante</option>
                    {names.length > 0 && (
                        names.map((r) => {
                            return (
                                <option value={r}>{r}</option>
                            )
                        })
                    )}
                    <option value={"otro"}>Otro..</option>
                </select>
                <br />
                <br />
                <h4>Escribe el restaurante en caso de que no se encuentre en la lista anterior</h4>
                
                <input type="text"
                    placeholder='Ingresa el nombre del restaurante'
                    disabled={restaurante !== "otro"}
                    value={option}
                    onChange={(e) => { handleName(e) }}
                    name='option'
                />
                <br />
                <h4>Direccion:</h4>
                <input
                    type="text"
                    placeholder='Ingresa la dirección del restaurante'
                    value={direccion}
                    onChange={(e) => { handleName(e) }}
                    name='direccion'
                />
                <br />
                <h4>Enlace de la pagina del restaurante (doordash):</h4>
                <input
                    type="text"
                    placeholder='Ingresa el enlace de la web de doordash del restaurante'
                    value={link}
                    onChange={(e) => { handleName(e) }}
                    name='link'
                />
                <br />
                <br />
                <div className='btn-enviar'>
                    <button 
                    onClick={(e) => {createRestaurant(e)}}
                    disabled={link.length <= 0 || direccion.length <= 0 || restaurante.length <= 0}
                    >Crear</button>
                </div>
            </div>
        </div>
    )
}
