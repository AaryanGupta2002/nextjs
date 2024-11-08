//src/app/page.tsx
"use client";
// Import necessary modules from chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement } from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

// Your component code
import { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
import { CorrelationChart } from '../components/CorrelationChart';

export default function Home() {
  const [company1, setCompany1] = useState<string>('');
  const [company2, setCompany2] = useState<string>('');
  const [correlation, setCorrelation] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);

  const handleCalculate = async () => {
    if (company1 && company2) {
      try {
        const response = await fetch('/api/calculateCorrelation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company1, company2 }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const result = data.correlation;
        setCorrelation(result);

        const chartData = {
          labels: ['Correlation'],
          datasets: [
            {
              label: `${company1} vs ${company2} Correlation`,
              data: [result],
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
            },
          ],
        };

        const chartOptions = {
          responsive: true,
          plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Pearson Correlation' },
          },
        };

        setChartData(chartData);
        setChartOptions(chartOptions);
      } catch (error) {
        console.error("Error occurred:", error);
        alert("There was an issue with loading the data. Please check the file paths or try again.");
      }
    }
  };

  const dropdownOptions = ['ZOMATO', 'TCS'];

  return (
    <div>
      <h1>Company Correlation Analysis</h1>
      <Dropdown label="Select Company 1" options={dropdownOptions} onChange={setCompany1} />
      <Dropdown label="Select Company 2" options={dropdownOptions} onChange={setCompany2} />
      <button onClick={handleCalculate} disabled={!company1 || !company2}>
        Calculate Correlation
      </button>
      {correlation !== null && <p>Correlation: {correlation}</p>}
      {correlation !== null && chartData && chartOptions && (
        <CorrelationChart correlation={correlation} data={chartData} options={chartOptions} />
      )}
    </div>
  );
}
