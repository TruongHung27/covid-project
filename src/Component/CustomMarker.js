import React from "react"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Marker, Popup } from 'react-leaflet';
import { useHistory } from "react-router-dom";



import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function CustomMarker(props)
{
    let history = useHistory();
    let url = props.data.countryInfo.flag;

    // let icon = L.icon({
    //     iconUrl: url,
    //     iconRetinaUrl: url,
    //     //shadowUrl: iconShadow,
    //     iconSize: new L.Point(10, 10),
    // })

    function onClick(){
        history.push({
            pathname: '/Details',
            state: { data: props.data }
        });
    }

    const buttonSyle = {
        width: '130px',
        height: 'auto',
        display: 'flex',
        textAlign: "center",
        justifyContent: "center",
        marginTop: "5px",
    }

    var position = [props.data.countryInfo.lat ? props.data.countryInfo.lat: 0 ,props.data.countryInfo.long ? props.data.countryInfo.long : 0]



    return (
        <div>
            <Marker position={position}>
         <Popup>
            {props.data.country} 
            <span></span> 
            <img src={url} width={'10px'} height={'10px'} alt=""></img>
            <br />Covid Cases: {props.data.cases}
            <br/>
            <button style={buttonSyle} onClick={onClick}>Covid Details</button>
        </Popup>
        </Marker>
    </div>
    )
}

export default CustomMarker;