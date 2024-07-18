// Import necessary libraries
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../App.css';

// Create the DistributedColumnsChart component

const DistributedColumnsChart = () => {
  // Sample data
  const chartData = [
    { x: 'Category 1', y: 30 },
    { x: 'Category 2', y: 45 },
    { x: 'Category 3', y: 25 },
    // Add more data points as needed
  ];

  // Chart configuration
  const options: ApexOptions = {
    chart: {
      type: 'bar', // Use bar chart for distributed columns
      height: 350,
      toolbar: {
        show: true,
        tools:{
          download:false // <== line to add
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%', // Set the column width to distribute columns
        distributed: false,  // Enable distributed columns
      },
      
    },
    
    dataLabels: {
      enabled: false,
     
      // Disable data labels for simplicity
    },
    
    xaxis: {
      categories: chartData.map(item => item.x), // X-axis categories
    },
    

    
  };
  

  // Return the ReactApexChart component with the provided options and data
  return (
    <ReactApexChart
      options={options}
      series={[{ data: chartData }]}
      type="bar"
      height={350}
      width={500}
    />
  );
};

// Export the DistributedColumnsChart component
export default DistributedColumnsChart;
