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
import Table from '../src/Components/Table'
import { sortData } from './Utils/util';
import LineGraph from './Components/LineGraph';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  
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
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
  }

  useEffect( async() => {
    await fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data);
    })
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }

  
  console.log("Country Info >>>",countryInfo);

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
          <InfoBox title="Corona Virus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/** Table */}
        {/** Graph */}
        {/** Map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
              <strong>Live Cases by Countries</strong>
              <Table countries={tableData} />
              <strong>Worldwide new cases</strong>
              <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
