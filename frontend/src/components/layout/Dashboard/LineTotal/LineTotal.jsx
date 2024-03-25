import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const LineTotal = () => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2024-03-23T08:00:00.000Z","2024-03-23T09:00:00.000Z","2024-03-23T10:00:00.000Z","2024-03-23T11:00:00.000Z","2024-03-23T12:00:00.000Z","2024-03-23T13:00:00.000Z","2024-03-23T14:00:00.000Z","2024-03-23T15:00:00.000Z","2024-03-23T16:00:00.000Z","2024-03-23T17:00:00.000Z","2024-03-23T18:00:00.000Z","2024-03-23T19:00:00.000Z","2024-03-23T20:00:00.000Z","2024-03-23T21:00:00.000Z","2024-03-23T22:00:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
      });
    
      const [chartSeries, setChartSeries] = useState([
        {
            name: 'Ca khám',
            data: [31, 40, 28, 51, 42, 109, 100]
          }
      ]);
  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="area" width='100%' height={320} />
    </div>
  )
}

export default LineTotal