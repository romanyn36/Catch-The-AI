import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import TitleCard from './TitleCard';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserGrowthChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'User Growth',
                data: labels.map(() => Math.random() * 1000 + 500),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <TitleCard title={"User Growth"}>
            <Line options={options} data={data} />
        </TitleCard>
    );
};

export default UserGrowthChart;
