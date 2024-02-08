import React, { useState } from "react";

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'a96958dd765235e7134cce0e4710e5b4';
    const difKelvin = 273.15;

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);
    const [error, setError] = useState(null);

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (ciudad.trim() === '') {
            setError('Por favor, introduce una ciudad.');
            return;
        }
        setError(null);
        await fetchClima();
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener el clima para esta ciudad. Por favor, verifica el nombre de la ciudad.');
            }
            const data = await response.json();
            setDataClima(data);
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error);
            setError('Ocurrió un error al obtener el clima.');
        }
    }

    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                    placeholder="Introduce una ciudad"
                />
                <button type="submit">Buscar</button>
            </form>  
            {error && <p>{error}</p>}
            {dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                        alt={dataClima.weather[0].description}
                    />
                </div>
            )}
        </div>
    );
};
