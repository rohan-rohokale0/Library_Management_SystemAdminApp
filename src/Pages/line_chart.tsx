// Import necessary libraries
import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Create the LineChart component
const LineChart: React.FC = () => {
  // Sample data
  const chartData = [
    { x: 'Jan', y: 30 },
    { x: 'Feb', y: 40 },
    { x: 'Mar', y: 25 },
    { x: 'Apr', y: 50 },
    // Add more data points as needed
  ];

  // Chart configuration
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
        tools:{
          download:false // <== line to add
        }
      }
    },
    xaxis: {
      categories: chartData.map(item => item.x),
    },
  };

  // Return the ReactApexChart component with the provided options and data
  return (
    <ReactApexChart
      options={options}
      series={[{ name: 'Series 1', data: chartData.map(item => item.y) }]}
      type="line"
      height={350}
      width={500}
    />
  );
};

// Export the LineChart component
export default LineChart;
