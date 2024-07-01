import React from 'react';
import { Bar } from 'react-chartjs-2';
import TitleCard from './TitleCard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AIDetectionResults ()  {
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
                label: 'AI Detection',
                data: labels.map(() => Math.random() * 1000 + 500),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            
        ],
    };

    return (
        <TitleCard title={"AI Detection Results"}>
            <Bar options={options} data={data} />
        </TitleCard>
    );
};

export default AIDetectionResults;
