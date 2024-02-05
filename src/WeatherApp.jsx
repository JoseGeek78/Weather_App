import { useState } from "react";


export const WeatherApp = () => {

     const [[ciudad, setCiudad] = useState("")

     const handleCambioCiudad = (e) => {
          setCiudad(e.target.value);
}

  return (
    <div className="container">
      <h1>Weather App</h1>

      <form>
        <input type="text" 
        value={ciudad} 
        onChange={handleCambioCiudad} 
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};
