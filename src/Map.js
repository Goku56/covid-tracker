import React from 'react'
import "./Map.css"
import { Map as Leaflet, TileLayer } from "react-leaflet"

function Map({center,zoom,countries,casesType}) {
    return (
        <div className="__map">
            <Leaflet center={center} countries={countries} zoom={zoom}>
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="http://osm.org/copyright">
                OpenStreetMap</a> contributors'
                />
            </Leaflet>            
        </div>
    )
}

export default Map;
