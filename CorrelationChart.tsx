//Nextjs/corrtn/src/components/CorrelationChart.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, Title, Tooltip, Legend);

type CorrelationChartProps = {
  correlation: number;
  data: any;
  options: any;
};

export function CorrelationChart({ data, options }: CorrelationChartProps) {
  return <Line data={data} options={options} />;
}
