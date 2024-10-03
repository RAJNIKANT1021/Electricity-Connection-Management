// src/components/ConnectionRequestsChart.js
import React, { useState, useMemo, useEffect } from 'react';
import './xp.css'; // Import your CSS file for styling
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import moment from 'moment'; // To handle date formatting
import { connectionsData } from '../data'; // Import your connection data

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Charts = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [connectionsDataState, setConnectionsDataState] = useState([]);

  // Load connections data from local storage or fall back to the default data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('connections'));
    if (storedData && storedData.length > 0) {
      setConnectionsDataState(storedData);
      console.log(2)
    } else {
      // Set default data and store it in local storage
      setConnectionsDataState(connectionsData);
      console.log(1)
      localStorage.setItem('connections', JSON.stringify(connectionsData));
    }
  }, []);

  // Extract unique statuses from data
  const statuses = [...new Set(connectionsDataState.map(req => req.Status))];

  // Function to aggregate data based on status and month
  const aggregateData = (status) => {
    const aggregated = {};

    connectionsDataState.forEach(req => {
      if (req.Status === status) {
        const month = moment(req.Date_of_Application, 'DD/MM/YY').format('MMMM'); // Extract month from Date_of_Application
        if (!aggregated[month]) {
          aggregated[month] = 0;
        }
        aggregated[month] += 1; // Increment count for the respective month
      }
    });

    return aggregated;
  };

  // Memoize aggregated data for performance optimization
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const aggregatedData = useMemo(() => aggregateData(selectedStatus), [selectedStatus, connectionsDataState]);

  // Prepare data for the bar chart
  const barData = {
    labels: Object.keys(aggregatedData), // Months
    datasets: [
      {
        label: `${selectedStatus} Requests`,
        data: Object.values(aggregatedData), // Corresponding counts
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Prepare data for the pie chart
  const pieData = {
    labels: statuses,
    datasets: [
      {
        data: statuses.map(status => connectionsDataState.filter(req => req.Status === status).length),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
    hoverOffset: 14,
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className='cont'>
      <h2>Connection Requests by Month</h2>
      <select value={selectedStatus} onChange={handleStatusChange} className='status-select'>
        {statuses.map(status => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <div className='chart-container'>
        <div className='bar-chart'>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className='pie-chart'>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
