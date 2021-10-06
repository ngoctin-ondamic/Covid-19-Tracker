import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});
  //https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data);
        console.log("Chart Data >>> ", chartData);
        setData(chartData);
      });
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
    return chartData;
  };

  return (
    <div>
      <Line
        type={"line"}
        data={{
          labels: [...data],
          datasets: [
            {
              label: "# Line graph",
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
                  beginAtZero: true,
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
