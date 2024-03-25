import React, { useState } from "react";
import Chart from "react-apexcharts";

const ColumBranch = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Bạch Đằng - Nhi', 'Nguyễn Oanh -Sản', 'Quang Trung - sản', 'Hoàng văn Thụ - mắt', 'QL50 -Lão', 'Nguyễn Ảnh Thủ -Nhi', 'Phan Đăng Lưu - Sản',
          'Nguỹen Oanh - Nhi ', 'Phan Văn Hớn - nhi', 'Thống Nhất -Nhi'
        ],
      }
  });

  const [chartSeries, setChartSeries] = useState([
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380 ],
    },
  ]);
  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="100%"
        height={320}
      />
    </div>
  );
};

export default ColumBranch;
