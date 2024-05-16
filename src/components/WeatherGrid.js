import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

function WeatherGrid() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [rows, setRows] = useState([]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    let crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);

    axios
      .post("https://weather-forecast-backend-knq5.onrender.com/weather_forcast_api/", {
        longitude: longitude,
        latitude: latitude,
      })
      .then((response) => {
        let date = response.data.date;
        let code = response.data.weather_code;
        let max = response.data.max_temperature;
        let min = response.data.min_temperature;
        let energy = response.data.energy;

        // console.log(date,code,max,min,energy)

        let buffer = [];

        for (let i = 0; i < date.length; i++) {
          let weather_icon = null;
          let code_number = code[i];

          if (code_number < 4) weather_icon = <CloudQueueIcon/>;
          else if (code_number < 58) weather_icon = <CloudIcon/>;
          else if (code_number < 68) weather_icon = <UmbrellaIcon/>;
          else if (code_number < 87) weather_icon = <AcUnitIcon/>;
          else weather_icon = <ThunderstormIcon/>;

          buffer.push({
            date: date[i],
            min_temp: min[i],
            max_temp: max[i],
            energy: energy[i],
            icon: weather_icon,
          });


          setRows(buffer);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            alert("Give location permissions and reload.");
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            alert("Give location permissions and reload.");
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Min. temperature(*C)</TableCell>
            <TableCell align="right">Max. temperature(*C)</TableCell>
            <TableCell align="right">Produced energy(kWh)</TableCell>
            <TableCell align="right">Weather icon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.min_temp}</TableCell>
              <TableCell align="right">{row.max_temp}</TableCell>
              <TableCell align="right">{row.energy}</TableCell>
              <TableCell align="right">
                  {row.icon}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeatherGrid;
