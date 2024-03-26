import React , { useState } from 'react'
import Chart from 'react-apexcharts'
const TotalHeThong = () => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            width: 380,
            type: 'donut',
            dropShadow: {
              enabled: true,
              color: '#111',
              top: -1,
              left: 3,
              blur: 3,
              opacity: 0.2
            }
          },
          stroke: {
            width: 0,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    showAlways: true,
                    show: true
                  }
                }
              }
            }
          },
          labels: ["Nhi đồng 315", "Phụ sản 315", "Mắt 315", "Lão khoa 315", "Đa khoa"," Tiêm chủng 315"],
              dataLabels: {
                dropShadow: {
                  blur: 3,
                  opacity: 0.8
                }
              },
            //   fill: {
            //     type: 'pattern',
            //       opacity: 1,
            //       pattern: {
            //         enabled: true,
            //         style: ['verticalLines', 'squares', 'horizontalLines', 'circles','slantedLines'],
            //       },
            //     },
                // states: {
                //     hover: {
                //       filter: 'none'
                //     }
                //   },
                  theme: {
                    palette: 'palette2'
                  },
                  title: {
                    text: "Tổng doanh thu hệ thống"
                  },
                //   plotOptions: {
                //     pie: {
                //       startAngle: -90,
                //       endAngle: 270
                //     }
                //   },
                fill: {
                    type: 'gradient',
                  },
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200
                      },
                      legend: {
                        formatter: function(val, opts) {
                            return val + " - " + opts.w.globals.series[opts.seriesIndex]
                          }
                      }
                    }
                  }]
    })
      
    
     
  return (
    <div>
      <Chart options={chartOptions} series={[44, 55, 41, 17, 15,25]} type="donut" width='100%' height={320} />
    </div>
  )
}

export default TotalHeThong