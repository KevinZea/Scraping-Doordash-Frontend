import React, { useEffect, useState } from 'react';
import './Restaurant.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import subway from '../../resources/Subway.webp';
import seven from '../../resources/seven.webp';
import dunkin from '../../resources/dunkin.webp';
import mc from '../../resources/mc.webp';
import taco from '../../resources/taco.webp';
import { NavLink } from 'react-router-dom';

const api = process.env.REACT_APP_API;

export default function Restaurant() {
    const { name } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios
            .get(`${api}restaurantgroup/${name}`)
            .then((r) => setRestaurants(r.data))
            .catch((error) => { console.log(error) });
    }, [name]);

    useEffect(() => {
        setImage(selectImage(name));
    }, [name, restaurants]);

    function selectImage(restaurantName) {
        switch (restaurantName) {
            case 'Subway':
                return subway;
            case 'Seven Eleven':
                return seven;
            case 'Dunkin':
                return dunkin;
            case 'Macdonalds':
                return mc;
            case 'Taco Bell':
                return taco;
            default:
                return null;
        }
    }
    async function deleteRestaurant(id, dir) {
        const response = window.confirm("¿Estas seguro de eliminar " + dir + ", recuerda que una vez eliminado no se puede volver a recuperar el restaurante eliminado")
        if (response) {
            try {
                await axios.delete(api + "deleteRestaurant/" + id)
                alert("Se ha eliminado exitosamente el restaurante " + dir)
                window.location.href = "/"
            } catch (error) {
                alert("algo salio mal, error: " + error)
            }

        }
        else {
            alert("No se ha eliminado ningun elemento")
        }
    }
    return (
        <div className='Restaurant'>
            <NavLink exact to={"/"}>
                <div className='btn-home'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                    </svg>
                </div>
            </NavLink>
            <div className='presentation'>
                <div className='imagePerfil'>
                    {image ? (
                        <img src={image} alt={name} />
                    ) : (
                        <p>Imagen no encontrada para {name}</p>
                    )}
                </div>
                <span>{name}</span>
            </div>
            <div className='list-status'>
                {restaurants.length > 0 ? (
                    restaurants.map((r) => {
                        return (
                            <div className='item-status'>
                                <button className='delete-restaurant' onClick={(e) => { deleteRestaurant(r.id, r.direccion) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </button>
                                <NavLink exact to={"/updateRestaurant/" + r.id}>
                                    <button className='edit-restaurant'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </button>
                                </NavLink>
                                <span>{r.direccion}</span>
                                <div className='dir-status'>
                                    <span className={r.status.includes("Open") ? 'abierto' : 'cerrado'}>{r.status}</span>
                                </div>
                            </div>
                        )
                    })
                ) :
                    <span>{error}</span>
                }
            </div>
        </div>
    );
}
