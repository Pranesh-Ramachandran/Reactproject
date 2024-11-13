import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdvancedAnalytics = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Student Enrollment',
                data: [50, 35, 100, 150, 65, 175],
                backgroundColor: '#E64833',
            },
            {
                label: 'Course Completion',
                data: [40, 60, 80, 110, 130, 160],
                backgroundColor: '#fff',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Student Enrollment and Course Completion',
            },
        },
    };

    return (
        <div className="body">
            <div className="advanced-analytics">
                <h2>Advanced Analytics</h2>
                <p className="chart-description">
                    This dashboard provides insights into student enrollment and course completion trends over the past six months. Analyze these trends to make data-driven decisions for future course offerings.
                </p>
                <div className="chart-container">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default AdvancedAnalytics;
