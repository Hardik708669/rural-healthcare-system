import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HealthTrendsChart = () => {
  const { language } = useLanguage();
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'

  // Sample health data for the chart
  const months = [
    language === 'hi' ? 'जनवरी' : 'January',
    language === 'hi' ? 'फरवरी' : 'February',
    language === 'hi' ? 'मार्च' : 'March',
    language === 'hi' ? 'अप्रैल' : 'April',
    language === 'hi' ? 'मई' : 'May',
    language === 'hi' ? 'जून' : 'June',
    language === 'hi' ? 'जुलाई' : 'July'
  ];

  const lineData = {
    labels: months,
    datasets: [
      {
        label: language === 'hi' ? 'बुखार' : 'Fever',
        data: [120, 190, 150, 80, 60, 40, 30],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: language === 'hi' ? 'खांसी' : 'Cough',
        data: [80, 120, 180, 140, 100, 70, 50],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: language === 'hi' ? 'सिरदर्द' : 'Headache',
        data: [60, 80, 100, 120, 90, 70, 60],
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: language === 'hi' ? 'उल्टी' : 'Vomiting',
        data: [40, 60, 80, 70, 50, 30, 20],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: language === 'hi' ? 'बुखार' : 'Fever',
        data: [120, 190, 150, 80, 60, 40, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: language === 'hi' ? 'खांसी' : 'Cough',
        data: [80, 120, 180, 140, 100, 70, 50],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
      {
        label: language === 'hi' ? 'सिरदर्द' : 'Headache',
        data: [60, 80, 100, 120, 90, 70, 60],
        backgroundColor: 'rgba(255, 205, 86, 0.7)',
        borderColor: 'rgb(255, 205, 86)',
        borderWidth: 1,
      },
      {
        label: language === 'hi' ? 'उल्टी' : 'Vomiting',
        data: [40, 60, 80, 70, 50, 30, 20],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} ${language === 'hi' ? 'मरीज' : 'patients'}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="h-80">
      {/* Chart Type Toggle */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              chartType === 'line'
                ? 'bg-teal-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => setChartType('line')}
          >
            {language === 'hi' ? 'रेखा चार्ट' : 'Line Chart'}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              chartType === 'bar'
                ? 'bg-teal-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => setChartType('bar')}
          >
            {language === 'hi' ? 'बार चार्ट' : 'Bar Chart'}
          </button>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-64">
        {chartType === 'line' ? (
          <Line data={lineData} options={options} />
        ) : (
          <Bar data={barData} options={options} />
        )}
      </div>
      
      {/* Chart Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-300">{language === 'hi' ? 'बुखार' : 'Fever'}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-300">{language === 'hi' ? 'खांसी' : 'Cough'}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-300">{language === 'hi' ? 'सिरदर्द' : 'Headache'}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-300">{language === 'hi' ? 'उल्टी' : 'Vomiting'}</span>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendsChart;