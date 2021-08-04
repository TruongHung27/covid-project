import React, { useEffect, useState } from "react"
import { Chart } from "react-google-charts"
import axios from "axios";
import "./Detail.css"
import { Link } from 'react-router-dom'


function MapChart(props)
{
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
 

    const countryData = countryList.map( (data) => [ data.countryInfo.iso2 , data.cases])
    countryData.unshift(['Country', 'Cases'])
    
    const chartEvents = [
        {
          callback: ({ chartWrapper, google }) => {
            const chart = chartWrapper.getChart();

            google.visualization.events.addListener(chart, "onmouseover", e => {
                const { row, column } = e;
                console.warn("MOUSE OVER ", { row, column });
              });

            chart.container.addEventListener("click", (ev) =>
             console.log(ev))
          },
          eventName: "ready"
        }
      ];

    return(
        <div>
        <header className="Detail-header">
        Covid-19 Info
        <Link className="PieChart" to="/">World Map</Link>
    </header>  
            <Chart
            width={'auto'}
            height={'900px'}
            chartType="GeoChart"
            loader={<div>Loading Chart</div>}
            data={countryData}
            options={{
                title: 'Covid-19 Data',
                colorAxis: { colors: [  "white" , 'yellow', '#ffd800'  ,'orange' , 'orangered','#e31b23'] },
                datalessRegionColor: 'black',
                defaultColor: '#fff000',
                backgroundColor:"#AAD3DF",
                overflowY: "hidden",
                overflowX: "hidden",
            }}
            chartEvents={chartEvents}
            mapsApiKey="AIzaSyBR0GkRCWLn3IybgN8EmiqjUEimhC0GBDk"
            rootProps={{ 'data-testid': '1' }}
            />  
        </div>
    )
}

export default MapChart