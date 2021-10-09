import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral"

function LineGraph() {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [xPoints,setXPoints] = useState([]);
  //https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=10")
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data);
        setData(chartData);
        const xPoints = chartData.map(item => item.x);
        setXPoints(xPoints);
      })
  }, []);

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    console.log("Chart Data",chartData);
    return chartData;
  };

  // const getDates = () => {
  //   const list = [];
  //   console.log("Data >>> ",data);
  //   for (const item in data) {
  //     console.log(item);
  //   }
  //   setDates(list);
  // };
  return (
    <div>
      <Line
        type={"line"}
        data={{
          labels: [...xPoints],
          datasets: [
            {
              label: "Changes in last 10 days",
              data: [...data],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
            },
          ],
        }}
        options={{
          // maintainAspectRatio may like the how to custom the size of the chart
          maintainAspectRatio: false,
          // scales may like the animation
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default LineGraph;
