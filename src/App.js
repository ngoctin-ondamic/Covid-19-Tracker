import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card
} from "@material-ui/core"
import './App.css';
import InfoBox from '../src/Components/InforBox'
import Map from '../src/Components/Map'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map(country => {
          return (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          )
        });
        setCountries(countries);
      });
  }

  useEffect(() => {
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header" >
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown" >
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">World Wide</MenuItem>
              {/**Countries Selection */}
              {
                countries.map(country => {
                  return (
                    <MenuItem value={country.value} >{country.name}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className="app_status">
          <InfoBox title="Corona Virus Cases" cases={123} total={123} />
          <InfoBox title="Recovered" cases={123} total={123} />
          <InfoBox title="Deaths" cases={123} total={123} />
        </div>

        {/** Table */}
        {/** Graph */}

        {/** Map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
              Live Cases by Countries
              Worldwide new cases
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
