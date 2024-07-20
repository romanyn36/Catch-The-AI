import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import AIDetectionResults from './AIDetectionResults';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [userData, setUserData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [uploadData, setUploadData] = useState([]);

  useEffect(() => {
    const fetchedUserData = Array(10).fill().map((_, index) => ({ id: index + 1, name: `User ${index + 1}` }));
    const fetchedSubscriptionData = Array(7).fill().map((_, index) => ({ id: index + 1, type: `Subscription ${index + 1}` }));
    const fetchedUploadData = Array(15).fill().map((_, index) => ({ id: index + 1, fileName: `File ${index + 1}` }));

    setUserData(fetchedUserData);
    setSubscriptionData(fetchedSubscriptionData);
    setUploadData(fetchedUploadData);
  }, []);

  const data = {
    labels: ['Users', 'Subscriptions', 'Uploads'],
    datasets: [
      {
        label: '# of Entries',
        data: [userData.length, subscriptionData.length, uploadData.length],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="overview" id="overview">
      <h2>Overview</h2>
      <Bar data={data} />
      {/* <UploadsOverview /> */}
      <AIDetectionResults />
      <DoughnutChart />
      <BarChart />
    </div>
  );
};

export default Overview;
