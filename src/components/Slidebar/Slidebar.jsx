import React from 'react'
import './Slidebar.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const api = process.env.REACT_APP_API

export default function Slidebar() {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        axios.get(api).then((r) => setRestaurants(r.data)).catch((error) => console.log(error))
    }, [])

    return (
        <div className='Slidebar'>
            <h1>Menu</h1>
            <div className='list-r'>
                <h2>Restaurantes</h2>
                {
                    restaurants.length > 0 && (
                        restaurants.map((r) => {
                            return (
                                <NavLink exact to={"/" + r} className={"links"}>
                                    <div className='item-restaurant'>
                                        <span>{r}</span>
                                    </div>
                                </NavLink>
                            )
                        })
                    )
                }
            </div>
            <div className='options'>
                <NavLink exact to={"/addRestaurant"} className={"option-link"}>
                <div className='options-item'>
                    <span>Agregar Restaurante</span>
                </div>
                </NavLink>
            </div>
        </div>
    )
}
