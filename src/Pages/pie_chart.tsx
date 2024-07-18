// Import necessary libraries
import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Create the PieChart component
const PieChart: React.FC = () => {
  // Sample data
  const chartData = [40, 30, 20, 10];

  // Chart configuration
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
  };

  // Return the ReactApexChart component with the provided options and data
  return (
    <ReactApexChart
      options={options}
      series={chartData}
      type="pie"
      height={800}
      width={514}

    />
  );
};

// Export the PieChart component
export default PieChart;
