import React, { useState , useEffect} from 'react';
import CustomMarker from './CustomMarker';
import { MapContainer, TileLayer} from 'react-leaflet';
import axios from 'axios';

function HomePage(){

    const [countryList, setList] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
        const result = await axios(
            "https://disease.sh/v3/covid-19/countries/"
        )
        setList(result.data)
        }
        fetchData();
    },[])

    return(
        <MapContainer center={[20,-10]} zoom={3} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    
        {countryList ? 
          countryList.map((data) => <CustomMarker key={data.country} data={data}/>)
          :
          ""
        }
      </MapContainer>
      
      )


}

export default HomePage