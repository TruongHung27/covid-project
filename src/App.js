import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import HomePage from './Component/HomePage';
import DetailPage from './Component/DetailPage';
import MapChart from "./Component/MapChart"
import BarChart from "./Component/BarChart"

function App() {
  return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
              <HomePage></HomePage>
          </Route>
          <Route path="/Details">
            <DetailPage>
            </DetailPage>
          </Route>
          <Route path="/MapChart">
            <MapChart>
            </MapChart>
          </Route>
          <Route path="/BarChart">
          <BarChart>
          </BarChart>
        </Route>
        </Switch>
      </div>
    </Router>
    
  )

}

export default App;
