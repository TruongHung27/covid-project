import React, { useEffect, useState , useRef } from "react"
import { Chart } from "react-google-charts"
import axios from "axios";
import "./Detail.css"
import { useLocation , Link, useHistory } from "react-router-dom";

function BarChart()
{
    const history = useHistory();
    const location = useLocation();
    const [covidInfo, setInfo] = useState();

    const dataState = useRef()
    let info = location.state;
    useEffect( () => {
        const url = "https://disease.sh/v3/covid-19/historical/" + info.data + "?lastdays=all"
        const fetchData = async () => {
            const result = await axios(
               url
            )
            setInfo(result.data.timeline)
            
        }
        fetchData();
    },[])

    function goBack() {
        history.goBack();
    }

    if(covidInfo != null){
        if(info != null){
            switch(info.int)
                {
                    case 0:
                        dataState.current = Object.entries(covidInfo.recovered)
                        dataState.current.Type = "Recovered";

                        dataState.current.unshift(['Date', 'Quantity'])
                        break;
                    case 1:
                        dataState.current = Object.entries(covidInfo.deaths)
                        dataState.current.Type = "Deaths";

                        dataState.current.unshift(['Date', 'Quantity'])
                        break;
                    case 2:
                        dataState.current = Object.entries(covidInfo.cases)
                        dataState.current.Type = "Cases";
                        dataState.current.unshift(['Date', 'Quantity'])
                        break;
                    default:
                        break;
                }
        }
    }


    return(
        <div>
                <header className="Detail-header">
                {covidInfo? dataState.current.Type : "Loading"}
                <Link className="PieChart" onClick={goBack}>Go Back</Link>
            </header> 
            {
                (covidInfo ? 
                    <Chart
                    width={'100%'}
                    height={'900px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={dataState.current}
                    options={{
                        title: 'Covid-19 Data',
                        backgroundColor: "#EAF2EF",
                    }}
                    //chartEvents={chartEvents}
                    rootProps={{ 'data-testid': '1' }}
                    /> 
                    :
                    <h2>No Historical Data Or Loading</h2>  
                )
            }
        </div>
        
    )
}

export default BarChart