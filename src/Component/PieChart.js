import React, { useEffect, useState } from "react"
import { Chart } from "react-google-charts"
import axios from "axios";
import "./Detail.css"
import { useHistory } from "react-router-dom";

function PieChart(props)
{
    const [covidInfo, setInfo] = useState();
    let history = useHistory();

    const Country = props.data.country;
    let current;
    function setVariable(e){
      current = e;
    }

    
    function onClick(){
        history.push({
            pathname: '/BarChart',
            state: { data: props.data.countryInfo.iso3, int: current.row }
        });
    }

    useEffect( () => {
        const url = "https://disease.sh/v3/covid-19/countries/" + Country
        const fetchData = async () => {
            const result = await axios(
                url
            )
            setInfo(result.data)
        }
        fetchData();
    },[])

    const chartEvents = [
        {
          callback: ({ chartWrapper, google }) => {
            const chart = chartWrapper.getChart();
            google.visualization.events.addListener(chart, "onmouseover", e => {
              setVariable(e);
              });

            chart.container.addEventListener("click", (ev) =>
              {
                if(current != null){
                  switch(current.row)
                {
                  case 0:
                    onClick();
                    break;

                  case 1:  
                    onClick();
                    break;
                  
                  case 2:
                    onClick();
                    break;
  
                  case 3:
                    alert("No API call for this")
                    break;

                  default:
                    alert("Something went wrong")
                    break;
                }
                }

              }
            )
          },
          eventName: "ready"
        }
      ];

    return(
        (covidInfo ? 
            <Chart
            width={'100%'}
            height={'900px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Cases', 'Number'],
                ['Recovered', covidInfo.recovered],
                ['Death', covidInfo.deaths],
                ['Caught', covidInfo.cases],
                ['Current Cases', covidInfo.cases - covidInfo.recovered]
            ]}
            options={{
                title: 'Covid-19 Data',
                //backgroundColor: "#EAF2EF",

                
                chartArea: {
                  // leave room for y-axis labels
                  width: '94%'
                },
                legend: {
                  position: 'top'
                },
                width: '100%'
            }}
            chartEvents={chartEvents}
            rootProps={{ 'data-testid': '1' }}
            /> 
            :
            ""  
        )
    )
}

export default PieChart