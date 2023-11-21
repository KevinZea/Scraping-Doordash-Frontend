import React from 'react'
import './Home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const api = process.env.REACT_APP_API

export default function Home() {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        axios.get(api).then((r) => setRestaurants(r.data)).catch((error) => console.log(error))
    }, [])

    return (
        <div className='Home'>
            <div className='list-restaurants'>
                <h1>Lista de Restaurantes</h1>
                {
                    restaurants.length > 0 ? (
                        restaurants.map((r) => {
                            return (
                                <NavLink exact to={"/" + r} className={"links"}>
                                    <div className='item-restaurant'>
                                        <span>{r}</span>
                                    </div>
                                </NavLink>
                            )
                        })
                    ) :
                        <div>Cargando...</div>
                }
            </div>
        </div>
    )
}
