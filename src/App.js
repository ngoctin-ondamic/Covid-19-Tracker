import React, { useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core"
import './App.css';

function App() {

  const [countries,setCountries] = useState(['VN','VN','VN']);

  return (
    <div className="app">
      <div className="app_header" >
      <h1>Covid-19 Tracker</h1>
        <FormControl className="app_dropdown" >
          <Select
            variant="outlined"
            value="abc"
          >
            {/**Countries Selection */}
            {
              countries.map(country => {
                return( 
                  <MenuItem value={country} >{country}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>



      {/** Header */}

      {/** Title + Select Input Dropdown Field */}

      {/** InforBoxs */}
      {/** InforBoxs */}
      {/** InforBoxs */}

      {/** Table */}
      {/** Graph */}

      {/** Map */}
    </div>
  );
}

export default App;
