import React, {useState, useEffect} from 'react';
import './App.css';
import {FormControl, Select, MenuItem, Card, CardContent} from "@material-ui/core";
import InfoBox  from "./InfoBox";
import Map from "./Map"
import Table from "./Table"
import {sortData, prettyPrintStat} from "./util"
import "leaflet/dist/leaflet.css"



function App() {
  
const [countries, setCountries] = useState([]);
const [country, setCountry] = useState("worldwide");
const [countryInfo, setCountryInfo] = useState({})
const [tableData, setTableData] = useState([]);
const [mapCenter, setMapCenter] = useState({lat:0,lng:0});
const [mapZoom, setMapZoom] = useState(3);
const [mapCountries, setMapCountries] = useState();
const [casesType, setCasesType] = useState("cases");

useEffect(() =>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then((res) => res.json())
  .then((data) => {
    setCountryInfo(data);
  });
},[]);

useEffect(() => {
  const getCountriesData = async() =>{
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((data) =>{
      const countries = data.map((country)=>({
        name:country.country,
        value:country.countryInfo.iso2
      }));

      const sortedData = sortData(data);
      setTableData(sortedData);
      setMapCountries(data);
      setCountries(countries);    
    });
  }    
  getCountriesData();
  }, []);

  
const onCountryChange = async(event) =>{
  const countryCode = event.target.value;
  setCountry(countryCode);

  const url = countryCode === "worldwide"
  ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`

  await fetch(url)
  .then(res => res.json())
  .then(data => {
    setCountry(countryCode);
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  })
};

return (
<div className="app">
      <div className="app__left">
         <div className="app__header">
          <h1>COVID 19 TRACKER</h1> 
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country)=>(
                <MenuItem keu={country.id} value={country.value}>{country.name}</MenuItem>  
                ))
              }
            </Select>
          </FormControl> 
          </div>
          
          <div className="app__stats">
              <InfoBox 
              isRed
              active={casesType === "cases"}
              onClick={(e)=>setCasesType('cases')}
                title="Coronavirus Cases" 
                total={prettyPrintStat(countryInfo.cases)} 
                cases={prettyPrintStat(countryInfo.todayCases)}/>
              <InfoBox 
              active={casesType === "recovered"}
              onClick={(e)=>setCasesType('recovered')}
                title="Recovery" 
                total={prettyPrintStat(countryInfo.recovered)}  
                cases={prettyPrintStat(countryInfo.todayRecovered)}/>
              <InfoBox
              isRed 
              active={casesType === "deaths"}
              onClick={(e)=>setCasesType('deaths')}
                title="Death" 
                total={prettyPrintStat(countryInfo.deaths)}  
                cases={prettyPrintStat(countryInfo.todayDeaths)}/>
          </div>
          <Map casesType={casesType} center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
      </div>
      <Card className="app__right">
        <CardContent>            
          <h3>Live Cases by Country</h3>
              <Table countries={tableData}/>
        </CardContent>  
      </Card>  
</div>
);
}

export default App;
