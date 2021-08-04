import React, { useEffect, useState , useRef } from "react"
import { Chart } from "react-google-charts"
import axios from "axios";
import "./Detail.css"

function LineChart(props)
{
    const [covidInfo, setInfo] = useState();
    const covidData = useRef()

    const Country = props.data.country;
    
    useEffect(() => {
        const url = "https://disease.sh/v3/covid-19/historical/" + Country + "?lastdays=all"
        const fetchData = async () => {
            const result = await axios(
               url
            )
            setInfo(result.data.timeline)
            //setData()
        }
        fetchData();
    }, [])

        if(covidInfo){
            let temp = Object.entries(covidInfo.recovered)
            let temp2 = Object.entries(covidInfo.deaths)
            let tempIterator2 = temp2.values();
            let temp3 = Object.entries(covidInfo.cases)
            let tempIterator3 = temp3.values();
    
            let temp10 = temp.map( (e,i) => [e,tempIterator2.next().value,tempIterator3.next().value]);
    
            let temp11 = []
            for(let i = 0 ; i < temp10.length; i++)
            {
                temp11.push([temp10[i][0][0],temp10[i][0][1],temp10[i][1][1],temp10[i][2][1]])  
            }
            covidData.current = temp11
            covidData.current.unshift(['Date', 'recovered', 'deaths', 'cases'])
        }
    

    return(
        (covidInfo ? 
            <Chart
            width={'100%'}
            height={'900px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={covidData.current}
            options={{
                title: 'Historical Covid-19 Data',
                backgroundColor: "#EAF2EF",
            }}
            rootProps={{ 'data-testid': '1' }}
            /> 
            :
            <div>Loading Chart</div>  
        )
    )   
}

export default LineChart