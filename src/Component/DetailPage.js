import React, { useEffect, useRef, useState } from "react"
import { useLocation , Link } from "react-router-dom";
import "./Detail.css"
import PieChart from "./PieChart";
import LineChart from "./LineChart";

function DetailPage()
{
    const [gridStyle, setStyle] = useState(true);
    const prevStyle = useRef();
    const location = useLocation();
    let info = location.state.data;

    useEffect(() => {
        prevStyle.current = gridStyle
    }, [gridStyle])

    return(
        <div className="Detail">
            <header className="Detail-header">
                {info.country}  : Covid-19 Info
                <Link className="PieChart" to="/MapChart">Interactive Map</Link>
                <Link className="PieChart" to="/">World Map</Link>
                <button onClick={ () => setStyle(!prevStyle.current) }> Switch Grid Style</button>
            </header>  
            <div>
                {
                    gridStyle ? <PieChart data={info}> </PieChart> :
                    <LineChart data={info}></LineChart>
                }
                
            </div>
        </div>
    )
}

export default DetailPage